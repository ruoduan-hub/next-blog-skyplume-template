import type { Blog } from 'contentlayer/generated'
import type { CoreContent } from 'pliny/utils/contentlayer'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Link from '@/components/Link'
import { LabHero } from '@/components/home/LabHero'
import { PostFeed } from '@/components/home/PostFeed'
import siteMetadata from '@/data/siteMetadata'

const MAX_DISPLAY = 5

export default function Home({ posts }: { posts: CoreContent<Blog>[] }) {
  const displayPosts = posts.slice(0, MAX_DISPLAY)

  return (
    <>
      <LabHero postCount={posts.length} />
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between gap-4 pt-8">
          <h2 className="text-2xl font-semibold tracking-normal text-gray-950 dark:text-gray-50">
            Latest Posts
          </h2>
        </div>
        <PostFeed posts={displayPosts} />
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end pt-4 text-sm font-medium">
          <Link
            href="/blog"
            className="text-gray-950 underline underline-offset-4 dark:text-gray-50"
            aria-label="View all posts"
          >
            All Posts
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
