'use client'

import { type ReactNode, useEffect, useRef } from 'react'

export default function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animation = `scroll-reveal 0.5s cubic-bezier(0.25,0.1,0.25,1) ${delay}s forwards`
          observer.disconnect()
        }
      },
      { rootMargin: '-60px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={className} style={{ opacity: 0, transform: 'translateY(24px)' }}>
      {children}
    </div>
  )
}
