import { AboutPage } from '@/components/about/AboutPage'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  return <AboutPage />
}
