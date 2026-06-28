import fs from 'node:fs'
import path from 'node:path'
import GithubSlugger from 'github-slugger'
import matter from 'gray-matter'
import { remark } from 'remark'
import { visit } from 'unist-util-visit'

/*
 * Convert an mdast node to display text for heading slugs.
 *
 * Keeping this local avoids pulling another dependency back in while supporting
 * the heading shapes produced by this project.
 *
 * @param {unknown} node mdast node or node-like object.
 * @returns {string} Concatenated textual content.
 */
function mdastToString(node) {
  if (!node || typeof node !== 'object') return ''
  if ('value' in node && typeof node.value === 'string') return node.value
  if ('alt' in node && typeof node.alt === 'string') return node.alt
  if (Array.isArray(node.children)) return node.children.map(mdastToString).join('')
  return ''
}

/*
 * Read dimensions from a PNG buffer.
 *
 * PNG stores width and height in the IHDR chunk at fixed offsets. Returning
 * `null` instead of throwing lets `remarkImgToJsx` leave unsupported or corrupt
 * images as ordinary Markdown images.
 *
 * @param {Buffer} buffer
 * @returns {{ width: number, height: number } | null}
 */
function readPngDimensions(buffer) {
  if (
    buffer.length < 24 ||
    buffer.toString('ascii', 1, 4) !== 'PNG' ||
    buffer.toString('ascii', 12, 16) !== 'IHDR'
  ) {
    return null
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  }
}

/*
 * Read dimensions from a JPEG buffer by scanning Start Of Frame markers.
 *
 * This covers baseline and progressive JPEGs. It is intentionally narrow:
 * unsupported files fall through to `null`, preserving author content instead
 * of failing the whole Contentlayer build.
 *
 * @param {Buffer} buffer
 * @returns {{ width: number, height: number } | null}
 */
function readJpegDimensions(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null

  let offset = 2
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) return null
    const marker = buffer[offset + 1]
    const length = buffer.readUInt16BE(offset + 2)
    const isStartOfFrame = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)

    if (isStartOfFrame) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      }
    }

    offset += 2 + length
  }

  return null
}

/*
 * Read dimensions from an SVG buffer.
 *
 * Prefer explicit `width`/`height` attributes, then fall back to the final two
 * values of `viewBox`. This is enough for project assets and avoids the
 * generic image probing dependency.
 *
 * @param {Buffer} buffer
 * @returns {{ width: number, height: number } | null}
 */
function readSvgDimensions(buffer) {
  const source = buffer.toString('utf8')
  const width = source.match(/\bwidth=["']?([0-9.]+)(?:px)?["']?/i)
  const height = source.match(/\bheight=["']?([0-9.]+)(?:px)?["']?/i)
  if (width && height) {
    return {
      width: Number(width[1]),
      height: Number(height[1]),
    }
  }

  const viewBox = source.match(/\bviewBox=["'][^"']*?\s([0-9.]+)\s([0-9.]+)["']/i)
  if (!viewBox) return null

  return {
    width: Number(viewBox[1]),
    height: Number(viewBox[2]),
  }
}

/*
 * Resolve dimensions for local public images supported by this project.
 *
 * The local implementation supports PNG, JPEG, and SVG because those are the
 * formats used by the template assets. Add AVIF/WebP parsers here if the blog
 * starts authoring those formats in MDX.
 *
 * @param {string} filePath Absolute filesystem path.
 * @returns {{ width: number, height: number } | null}
 */
function readImageDimensions(filePath) {
  const buffer = fs.readFileSync(filePath)
  const extension = path.extname(filePath).toLowerCase()

  if (extension === '.png') return readPngDimensions(buffer)
  if (extension === '.jpg' || extension === '.jpeg') return readJpegDimensions(buffer)
  if (extension === '.svg') return readSvgDimensions(buffer)

  return null
}

/*
 * Extract YAML frontmatter from the Markdown AST into `file.data.frontmatter`.
 *
 * Contentlayer already validates declared fields separately; this plugin keeps
 * compatibility for tooling that reads parsed frontmatter from the unified/vfile
 * data object.
 *
 * @returns {import('unified').Plugin}
 */
export function remarkExtractFrontmatter() {
  return (tree, file) => {
    visit(tree, 'yaml', (node) => {
      file.data.frontmatter = matter(`---\n${node.value}\n---`).data
    })
  }
}

/*
 * Turn fenced-code language titles into a sibling title node.
 *
 * Example: ```ts:lib/example.ts becomes:
 * - a `<div className="remark-code-title">lib/example.ts</div>` node
 * - a code block whose language is `ts`
 *
 * This keeps the existing AST shape so the prose CSS continues to style titled
 * code blocks without layout changes.
 *
 * @returns {import('unified').Plugin}
 */
export function remarkCodeTitles() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (!parent || typeof index !== 'number') return

      const nodeLang = node.lang || ''
      if (!nodeLang.includes(':')) return

      const separatorIndex = nodeLang.indexOf(':')
      const language = nodeLang.slice(0, separatorIndex)
      const title = nodeLang.slice(separatorIndex + 1)
      if (!title) return

      parent.children.splice(index, 0, {
        type: 'mdxJsxFlowElement',
        name: 'div',
        attributes: [{ type: 'mdxJsxAttribute', name: 'className', value: 'remark-code-title' }],
        children: [{ type: 'text', value: title }],
        data: { _xdmExplicitJsx: true },
      })
      node.lang = language
    })
  }
}

/*
 * Convert local Markdown image nodes to MDX `Image` components with dimensions.
 *
 * Only files under `public/` are transformed. Remote URLs and unsupported local
 * formats are left untouched, which is the safest authoring behavior for MDX
 * files.
 *
 * The paragraph is changed to a `div` to avoid invalid `<p><Image /></p>` HTML
 * when MDX renders the node.
 *
 * @returns {import('unified').Plugin}
 */
export function remarkImgToJsx() {
  return (tree) => {
    visit(
      tree,
      (node) => node.type === 'paragraph' && node.children?.some((child) => child.type === 'image'),
      (node) => {
        const imageNodeIndex = node.children.findIndex((child) => child.type === 'image')
        const imageNode = node.children[imageNodeIndex]
        const imagePath = path.join(process.cwd(), 'public', imageNode.url)

        if (!fs.existsSync(imagePath)) return

        const dimensions = readImageDimensions(imagePath)
        if (!dimensions) return

        imageNode.type = 'mdxJsxFlowElement'
        imageNode.name = 'Image'
        imageNode.attributes = [
          { type: 'mdxJsxAttribute', name: 'alt', value: imageNode.alt },
          { type: 'mdxJsxAttribute', name: 'src', value: imageNode.url },
          { type: 'mdxJsxAttribute', name: 'width', value: dimensions.width },
          { type: 'mdxJsxAttribute', name: 'height', value: dimensions.height },
        ]

        node.type = 'div'
        node.children[imageNodeIndex] = imageNode
      }
    )
  }
}

/*
 * Collect Markdown headings into `file.data.toc`.
 *
 * Uses `github-slugger` for URL fragments so generated TOC links match GitHub
 * style slugs and the `rehype-slug` output used elsewhere in the MDX pipeline.
 *
 * @returns {import('unified').Plugin}
 */
export function remarkTocHeadings() {
  const slugger = new GithubSlugger()

  return (tree, file) => {
    const toc = []
    visit(tree, 'heading', (node) => {
      const value = mdastToString(node)
      toc.push({
        value,
        url: `#${slugger.slug(value)}`,
        depth: node.depth,
      })
    })
    file.data.toc = toc
  }
}

/*
 * Parse raw Markdown and return the same TOC data that `remarkTocHeadings`
 * writes during Contentlayer processing.
 *
 * This is used in `contentlayer.config.ts` as a computed field, so the returned
 * array becomes available to layouts and the generated search document.
 *
 * @param {string} markdown Raw MDX/Markdown body.
 * @returns {Promise<Array<{ value: string, url: string, depth: number }>>}
 */
export async function extractTocHeadings(markdown) {
  const vfile = await remark().use(remarkTocHeadings).process(markdown)
  return vfile.data.toc
}
