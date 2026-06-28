import TOCInline from '@/components/mdx/TOCInline'
import Pre from '@/components/mdx/Pre'
import BlogNewsletterForm from '@/components/newsletter/BlogNewsletterForm'
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
