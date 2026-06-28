export type SocialLink = {
  label: string
  href: string
}

export type SiteStackNote = {
  title: string
  description: string
}

export const profile = {
  name: 'Chad',
  handle: 'ruoduan-hub',
  title: 'Frontend developer, writer, and maker',
  email: '',
  location: 'China',
  avatar: '/static/images/avatar.svg',
  intro:
    'I am Chad, the writer behind 0x1ai.com. I focus on frontend development, product thinking, AI tools, and long-term personal systems, and I use this blog to record technical notes, project write-ups, and practical experiments.',
  quote: 'Build useful things, write them down, and keep improving the system.',
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/ruoduan-hub' },
    { label: 'Blog', href: 'https://www.0x1ai.com/' },
  ] satisfies SocialLink[],
  interests: ['Writing', 'Engineering', 'Open Source', 'Design Systems'],
  skills: {
    languages: ['TypeScript', 'JavaScript', 'MDX', 'CSS'],
    frontend: ['Next.js', 'React', 'Tailwind CSS', 'shadcn/ui'],
    content: ['Contentlayer', 'RSS', 'Local Search', 'SEO Metadata'],
    deployment: ['Vercel', 'Static Export', 'GitHub Actions Ready'],
  },
  siteHistory: [
    'Start by editing data/siteMetadata.js and data/profile.ts.',
    'Write MDX posts in data/blog with frontmatter for title, date, tags, summary, and authors.',
    'Place post assets under public/static/blog/<slug> and reference them from MDX.',
    'Deploy to Vercel, Netlify, or any platform that supports Next.js.',
  ],
  siteStackNotes: [
    {
      title: 'Framework',
      description: 'Next.js App Router with TypeScript and React 19.',
    },
    {
      title: 'Content',
      description:
        'Contentlayer-powered MDX posts, computed slugs, reading time, and table of contents.',
    },
    {
      title: 'Publishing',
      description: 'RSS, sitemap, robots, local search, dark mode, and optional Giscus comments.',
    },
  ] satisfies SiteStackNote[],
}
