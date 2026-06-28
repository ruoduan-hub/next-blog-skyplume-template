/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Skyplume Blog',
  author: 'Chad',
  headerTitle: 'Skyplume',
  description:
    'A clean, content-first Next.js blog template built with Contentlayer, Tailwind CSS, and MDX.',
  language: 'en-us',
  theme: 'system',
  siteUrl: 'https://www.0x1ai.com/',
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/skyplume-card.svg`,
  email: '',
  github: 'https://github.com/ruoduan-hub',
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
