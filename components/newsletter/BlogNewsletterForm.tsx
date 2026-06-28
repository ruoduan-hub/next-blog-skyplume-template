import NewsletterForm from './NewsletterForm'

export default function BlogNewsletterForm({ title, apiUrl }: { title?: string; apiUrl?: string }) {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-gray-100 p-6 sm:px-14 sm:py-8 dark:bg-gray-800">
        <NewsletterForm title={title} apiUrl={apiUrl} />
      </div>
    </div>
  )
}
