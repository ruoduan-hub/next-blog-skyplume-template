'use client'

import { Check, Copy } from 'lucide-react'
import { useRef, useState } from 'react'

export default function Pre({ children }: { children: React.ReactNode }) {
  const textInput = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    const code = textInput.current?.textContent
    if (!code) return

    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      ref={textInput}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setCopied(false)
      }}
      className="relative"
    >
      {hovered && (
        <button
          aria-label={copied ? 'Code copied' : 'Copy code'}
          className={`absolute top-2 right-2 h-8 w-8 rounded border-2 bg-gray-700 p-1 dark:bg-gray-800 ${
            copied
              ? 'border-green-400 text-green-400 focus:border-green-400 focus:outline-none'
              : 'border-gray-300 text-gray-300'
          }`}
          onClick={onCopy}
          type="button"
        >
          {copied ? <Check aria-hidden="true" size={18} /> : <Copy aria-hidden="true" size={18} />}
        </button>
      )}
      <pre>{children}</pre>
    </div>
  )
}
