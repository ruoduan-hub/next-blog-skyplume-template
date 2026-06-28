'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GiscusComments } from '@/components/comments/GiscusComments'
import siteMetadata from '@/data/siteMetadata'

export default function Comments({ slug, title }: { slug: string; title?: string }) {
  const [loadComments, setLoadComments] = useState(false)
  const commentsProvider = (siteMetadata.comments as { provider?: string } | undefined)?.provider

  if (commentsProvider !== 'giscus') {
    return null
  }

  return (
    <div className="not-prose">
      {loadComments ? (
        <GiscusComments slug={slug} title={title} />
      ) : (
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => setLoadComments(true)}
          className="gap-2"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          Load comments
        </Button>
      )}
    </div>
  )
}
