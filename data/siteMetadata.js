/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Skyplume Blog',
  author: 'Skyplume Author',
  headerTitle: 'Skyplume',
  description:
    'A clean, content-first Next.js blog template built with Contentlayer, Tailwind CSS, and MDX.',
  language: 'en-us',
  theme: 'system',
  siteUrl: 'https://example.com',
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/skyplume-card.svg`,
  email: 'hello@example.com',
  github: 'https://github.com/your-username',
  locale: 'en-US',
  stickyNav: false,
  analytics: {},
  newsletter: {
    provider: '',
  },
  comments: {
    provider: 'giscus',
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
