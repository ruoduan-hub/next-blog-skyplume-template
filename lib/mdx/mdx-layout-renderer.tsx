import React from 'react'
import ReactDOM from 'react-dom'
import * as jsxRuntime from 'react/jsx-runtime'
import type { MDXComponents } from 'mdx/types'

type MdxGlobals = Record<string, unknown>

/**
 * Compile a Contentlayer-generated MDX code string into a React component.
 *
 * Contentlayer stores MDX as executable function source. This local renderer
 * provides React, ReactDOM, and the JSX runtime so existing compiled documents
 * render without being re-authored.
 *
 * @param code Compiled MDX function source from `post.body.code`.
 * @param globals Optional extra runtime globals for custom MDX components.
 * @returns React component exported by the compiled MDX module.
 */
export function getMDXComponent(code: string, globals: MdxGlobals = {}) {
  const scope = { React, ReactDOM, _jsx_runtime: jsxRuntime, ...globals }
  const fn = new Function(...Object.keys(scope), code)
  return fn(...Object.values(scope)).default
}

/**
 * Memoize the compiled MDX component for React rendering.
 *
 * Recompiling the MDX function on every render is unnecessary and can be costly
 * on long posts, so this helper memoizes the compiled component by code string
 * and optional globals.
 *
 * @param code Compiled MDX function source.
 * @param globals Optional extra runtime globals.
 * @returns Memoized React component.
 */
export function useMDXComponent(code: string, globals: MdxGlobals = {}) {
  return React.useMemo(() => getMDXComponent(code, globals), [code, globals])
}

type MDXLayoutRendererProps = {
  code: string
  components?: MDXComponents
  [key: string]: unknown
}

/**
 * Render a compiled MDX document with the project's component map.
 *
 * `components` comes from `components/MDXComponents.tsx` and controls overrides
 * such as custom links, images, tables, code blocks, and newsletter forms.
 * Additional props are forwarded to the MDX component; the blog detail page uses
 * this to pass `toc`.
 */
export function MDXLayoutRenderer({ code, components, ...rest }: MDXLayoutRendererProps) {
  const Mdx = useMDXComponent(code)
  return <Mdx components={components} {...rest} />
}
