import { NextRequest, NextResponse } from 'next/server'

type NewsletterOptions = {
  provider?: string
}

/**
 * Create a Next.js App Router handler for newsletter subscriptions.
 *
 * This project ships with `siteMetadata.newsletter.provider` empty, so the
 * local handler keeps the route contract without bundling provider SDK logic:
 *
 * - missing/invalid JSON email -> `{ error: 'Email is required' }` with 400
 * - configured but unsupported provider -> `{ error: '<provider> not supported' }` with 500
 *
 * Add provider-specific integrations here if the site later enables newsletter
 * signup. Keep each provider behind this route so API keys never enter client
 * bundles.
 *
 * @param options Newsletter provider configuration from site metadata.
 * @returns Route handler usable as both `GET` and `POST` exports.
 */
export function NewsletterAPI(options: NewsletterOptions) {
  return async function handler(req: NextRequest) {
    let email: string | undefined

    try {
      const body = await req.json()
      email = body?.email
    } catch {
      email = undefined
    }

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    return NextResponse.json({ error: `${options.provider || ''} not supported` }, { status: 500 })
  }
}
