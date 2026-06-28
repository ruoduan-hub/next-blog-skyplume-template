'use client'

import type { Blog } from 'contentlayer/generated'
import { formatDate } from 'pliny/utils/formatDate'
import type { CoreContent } from 'pliny/utils/contentlayer'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { useEffect, useRef } from 'react'

type PostFeedProps = {
  posts: CoreContent<Blog>[]
}

function PostFeedItem({ index, post }: { index: number; post: CoreContent<Blog> }) {
  const ref = useRef<HTMLLIElement>(null)
  const { slug, date, title, summary, tags } = post

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('animate-item-reveal')
          el.style.animationDelay = `${index * 60}ms`
          observer.disconnect()
        }
      },
      { rootMargin: '-40px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <li ref={ref} className="py-8 opacity-0">
      <article className="grid gap-4 md:grid-cols-[132px_1fr] md:items-start">
        <time
          dateTime={date}
          className="text-sm font-medium text-gray-500 dark:text-gray-400"
          suppressHydrationWarning
        >
          {formatDate(date, siteMetadata.locale)}
        </time>
        <div>
          <h2 className="text-2xl leading-8 font-semibold tracking-normal">
            <Link href={`/blog/${slug}`} className="text-gray-950 dark:text-gray-50">
              {title}
            </Link>
          </h2>
          <div className="mt-2 flex flex-wrap">
            {tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
          {summary && (
            <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">{summary}</p>
          )}
          <Link
            href={`/blog/${slug}`}
            className="mt-4 inline-flex text-sm font-medium text-gray-950 underline underline-offset-4 dark:text-gray-50"
            aria-label={`Read post: ${title}`}
          >
            Continue reading
          </Link>
        </div>
      </article>
    </li>
  )
}

export function PostFeed({ posts }: PostFeedProps) {
  if (!posts.length) {
    return <p className="py-10 text-sm text-gray-500 dark:text-gray-400">No posts yet.</p>
  }

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-800">
      {posts.map((post, index) => (
        <PostFeedItem key={post.slug} index={index} post={post} />
      ))}
    </ul>
  )
}
