import Link from '@/components/Link'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Tags',
  description: 'Browse posts by topic.',
})

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const totalTaggedPosts = sortedTags.reduce((total, tag) => total + tagCounts[tag], 0)
  const topTags = sortedTags.slice(0, 4)

  return (
    <div className="min-w-0 overflow-x-hidden py-10 sm:py-14">
      <section className="border-b border-gray-200 pb-10 dark:border-gray-800">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div className="min-w-0">
            <p className="text-primary-600 dark:text-primary-400 text-sm font-medium">
              Topic index
            </p>
            <h1 className="mt-3 text-4xl leading-tight font-semibold tracking-normal text-gray-950 sm:text-5xl dark:text-gray-50">
              Tags
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-gray-600 dark:text-gray-300">
              Use tags to connect related notes, tutorials, essays, and project write-ups.
            </p>
          </div>

          <dl className="grid min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-200 text-center sm:grid-cols-2 dark:border-gray-800 dark:bg-gray-800">
            <div className="bg-white p-5 dark:bg-gray-950">
              <dt className="text-sm text-gray-500 dark:text-gray-400">Tags</dt>
              <dd className="mt-2 text-3xl font-semibold text-gray-950 dark:text-gray-50">
                {sortedTags.length}
              </dd>
            </div>
            <div className="bg-white p-5 dark:bg-gray-950">
              <dt className="text-sm text-gray-500 dark:text-gray-400">Tagged posts</dt>
              <dd className="mt-2 text-3xl font-semibold text-gray-950 dark:text-gray-50">
                {totalTaggedPosts}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="min-w-0 py-10">
        <div className="flex min-w-0 flex-wrap gap-x-3 gap-y-3 sm:gap-x-5">
          {tagKeys.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">No tags yet.</p>
          )}
          {sortedTags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${slug(tag)}`}
              className="hover:bg-primary-50 hover:text-primary-700 hover:ring-primary-100 dark:hover:bg-primary-950 dark:hover:text-primary-300 dark:hover:ring-primary-800 text-primary-600 dark:text-primary-400 inline-flex max-w-full items-baseline gap-1 rounded-full bg-gray-50 px-3 py-2 text-sm font-medium uppercase ring-1 ring-gray-200 transition-colors dark:bg-gray-900 dark:ring-gray-800"
              aria-label={`View posts tagged ${tag}`}
            >
              <span className="min-w-0 break-words">{tag.split(' ').join('-')}</span>
              <span className="font-semibold text-gray-500 dark:text-gray-400">
                {`(${tagCounts[tag]})`}
              </span>
            </Link>
          ))}
        </div>

        {topTags.length > 0 && (
          <div className="mt-8 flex min-w-0 flex-wrap gap-2 border-t border-gray-200 pt-6 dark:border-gray-800">
            <span className="mr-2 text-sm text-gray-500 dark:text-gray-400">Top topics</span>
            {topTags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${slug(tag)}`}
                className="bg-primary-50 text-primary-700 ring-primary-100 hover:bg-primary-100 dark:bg-primary-950 dark:text-primary-300 dark:ring-primary-800 dark:hover:bg-primary-900 rounded-full px-3 py-1 text-sm font-medium ring-1 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
