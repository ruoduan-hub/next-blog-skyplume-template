'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function ProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    let cancelled = false

    const run = async () => {
      const steps = [
        { scaleX: 0.25, opacity: 1, duration: 80 },
        { scaleX: 0.55, duration: 120 },
        { scaleX: 0.82, duration: 150 },
        { scaleX: 0.96, duration: 250 },
        { scaleX: 1, duration: 50 },
      ]

      for (const step of steps) {
        if (cancelled) return
        const animation = bar.animate(
          {
            transform: [
              `scaleX(${bar.getAnimations().length > 0 ? 'inherit' : '0'})`,
              `scaleX(${step.scaleX})`,
            ],
            opacity: [null, step.opacity ?? 1],
          },
          { duration: step.duration, fill: 'forwards', easing: 'ease-out' }
        )
        await animation.finished
      }

      if (!cancelled) {
        bar.animate({ opacity: [1, 0] }, { duration: 150, fill: 'forwards', easing: 'ease-out' })
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [pathname, searchParams])

  return (
    <div
      ref={barRef}
      className="bg-primary-500 pointer-events-none fixed top-0 right-0 left-0 z-[9999] h-[2px] origin-left"
      style={{ transform: 'scaleX(0)', opacity: '0' }}
    />
  )
}
