import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col items-center gap-4 py-8">
        <div className="flex items-center gap-5">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={5} />
          <SocialIcon kind="github" href={siteMetadata.github} size={5} />
          <SocialIcon kind="rss" href={`${siteMetadata.siteUrl}/feed.xml`} size={5} />
        </div>

        <div className="text-center text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          <span>{`© ${new Date().getFullYear()} `}</span>
          <span>{siteMetadata.author}</span>
        </div>

        <div className="text-center text-xs text-gray-400 dark:text-gray-500">
          Built with nextjs-blog-skyplume-template.
        </div>
      </div>
    </footer>
  )
}
