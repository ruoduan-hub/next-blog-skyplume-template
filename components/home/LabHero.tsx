import Link from '@/components/Link'
import { profile } from '@/data/profile'

type LabHeroProps = {
  postCount: number
}

export function LabHero({ postCount }: LabHeroProps) {
  return (
    <section className="grid gap-8 pt-10 pb-12 md:grid-cols-[1fr_260px] md:items-end">
      <div className="max-w-3xl">
        <p
          className="animate-hero-reveal mb-3 text-xs font-medium tracking-widest text-gray-500 uppercase dark:text-gray-400"
          style={{ animationDelay: '0ms' }}
        >
          Skyplume
        </p>
        <h1
          className="animate-hero-reveal text-4xl leading-tight font-semibold tracking-normal text-gray-950 sm:text-5xl dark:text-gray-50"
          style={{ animationDelay: '80ms' }}
        >
          A calm Next.js blog template for thoughtful writing
        </h1>
        <p
          className="animate-hero-reveal mt-6 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300"
          style={{ animationDelay: '160ms' }}
        >
          {profile.intro}
        </p>
        <div
          className="animate-hero-reveal mt-8 flex flex-wrap gap-3"
          style={{ animationDelay: '240ms' }}
        >
          <Link
            className="bg-primary text-primary-foreground hover:bg-primary/80 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-8 shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding px-2.5 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-3"
            href="/blog"
          >
            Read posts
          </Link>
          <Link
            className="border-border bg-background hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-8 shrink-0 items-center justify-center rounded-lg border bg-clip-padding px-2.5 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-3"
            href="/about"
          >
            About
          </Link>
        </div>
      </div>
      <div
        className="animate-hero-reveal grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 text-center dark:border-gray-800 dark:bg-gray-800"
        style={{ animationDelay: '0ms' }}
      >
        <div className="bg-white p-4 dark:bg-gray-950">
          <p className="text-2xl font-semibold text-gray-950 dark:text-gray-50">{postCount}</p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Posts</p>
        </div>
        <div className="bg-white p-4 dark:bg-gray-950">
          <p className="text-2xl font-semibold text-gray-950 dark:text-gray-50">MDX</p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Content</p>
        </div>
      </div>
    </section>
  )
}
