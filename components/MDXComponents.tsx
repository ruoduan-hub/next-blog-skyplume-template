import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import { ProseIframe } from './mdx/ProseIframe'
import { ProseImage } from './mdx/ProseImage'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  img: ProseImage,
  iframe: ProseIframe,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
}
