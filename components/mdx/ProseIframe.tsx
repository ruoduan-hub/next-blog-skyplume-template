import type { ComponentPropsWithoutRef } from 'react'

type ProseIframeProps = ComponentPropsWithoutRef<'iframe'>

/**
 * Wrap embedded iframes so legacy and third-party embeds do not overflow on mobile.
 */
export function ProseIframe({ className, title, ...props }: ProseIframeProps) {
  return (
    <span className="my-8 block w-full overflow-hidden rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <iframe
        {...props}
        title={title || 'Embedded content'}
        loading={props.loading || 'lazy'}
        className={['block max-w-full', className].filter(Boolean).join(' ')}
      />
    </span>
  )
}
