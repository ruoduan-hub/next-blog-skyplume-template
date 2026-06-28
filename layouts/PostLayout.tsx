import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'

import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published</dt>
                  <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:divide-y-0 dark:divide-gray-700">
            <div className="pt-6 pb-8 lg:border-b lg:border-gray-200 lg:pt-11 lg:dark:border-gray-700">
              <div className="flex flex-wrap justify-center gap-4 sm:space-x-12 lg:block lg:space-y-8 lg:space-x-0">
                {authorDetails.map((author) => (
                  <div className="space-y-0.5" key={author.name}>
                    <p className="text-xs tracking-widest text-gray-400 uppercase dark:text-gray-500">
                      Author
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
                      {author.name}
                    </p>
                    {author.twitter && (
                      <Link
                        href={author.twitter}
                        className="hover:text-primary-500 dark:hover:text-primary-400 text-xs text-gray-400 transition-colors dark:text-gray-500"
                      >
                        {author.twitter
                          .replace('https://twitter.com/', '@')
                          .replace('https://x.com/', '@')}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="divide-y divide-gray-200 lg:col-span-3 lg:row-span-2 lg:pb-0 dark:divide-gray-700">
              <div className="prose dark:prose-invert max-w-none pt-10 pb-8">{children}</div>
              {siteMetadata.comments && (
                <div
                  className="pt-8 pb-8 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  <Comments slug={slug} title={title} />
                </div>
              )}
            </div>
            <footer className="lg:col-start-1 lg:row-start-2">
              <div className="text-sm leading-5 font-medium">
                {tags && (
                  <div className="py-4 lg:py-8">
                    <h2 className="text-xs tracking-widest text-gray-400 uppercase dark:text-gray-500">
                      Tags
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex gap-3 py-4 lg:flex-col lg:gap-4 lg:py-8">
                    {prev && prev.path && (
                      <Link
                        href={`/${prev.path}`}
                        className="group hover:border-primary-200 dark:hover:border-primary-800 flex-1 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50"
                      >
                        <span className="text-xs tracking-widest text-gray-400 uppercase dark:text-gray-500">
                          &larr; Previous
                        </span>
                        <p className="group-hover:text-primary-500 dark:group-hover:text-primary-400 mt-1 line-clamp-2 text-sm text-gray-700 transition-colors dark:text-gray-300">
                          {prev.title}
                        </p>
                      </Link>
                    )}
                    {next && next.path && (
                      <Link
                        href={`/${next.path}`}
                        className="group hover:border-primary-200 dark:hover:border-primary-800 flex-1 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50"
                      >
                        <span className="text-xs tracking-widest text-gray-400 uppercase dark:text-gray-500">
                          Next &rarr;
                        </span>
                        <p className="group-hover:text-primary-500 dark:group-hover:text-primary-400 mt-1 line-clamp-2 text-sm text-gray-700 transition-colors dark:text-gray-300">
                          {next.title}
                        </p>
                      </Link>
                    )}
                  </div>
                )}
              </div>
              <div className="border-t border-gray-200 pt-4 lg:pt-6 dark:border-gray-700">
                <Link
                  href={`/${basePath}`}
                  className="group hover:text-primary-500 dark:hover:text-primary-400 inline-flex items-center gap-1 text-sm text-gray-500 transition-colors dark:text-gray-400"
                  aria-label="Back to posts"
                >
                  <span className="transition-transform group-hover:-translate-x-0.5">&larr;</span>
                  <span>Back to posts</span>
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
