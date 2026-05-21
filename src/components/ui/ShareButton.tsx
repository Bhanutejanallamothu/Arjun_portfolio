import React, { useEffect, useMemo, useRef, useState } from "react"
import { cn } from "../../lib/utils"
import { Button } from "./Button"
import "./ShareButton.css"

interface ShareLink {
  iconClass: string
  href?: string
  onClick?: () => void | Promise<void>
  label: string
}

interface ShareButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  links: ShareLink[]
  children: React.ReactNode
}

const ShareButton = ({
  className,
  links,
  children,
  onClick,
  type = "button",
  ...props
}: ShareButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const shellRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!shellRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [isOpen])

  const width = useMemo(() => `${Math.max(11.5, links.length * 2.9)}rem`, [links.length])

  const reveal = () => setIsOpen(true)
  const hide = () => setIsOpen(false)

  return (
    <div
      ref={shellRef}
      className={cn("share-button-shell", { "is-open": isOpen })}
      style={{ width }}
      onMouseEnter={reveal}
      onMouseLeave={hide}
      onFocusCapture={reveal}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          hide()
        }
      }}
    >
      <Button
        type={type}
        variant="noShadow"
        className={cn("share-button-trigger", className)}
        onClick={(event) => {
          if (!isOpen) {
            event.preventDefault()
            reveal()
          }
          onClick?.(event)
        }}
        {...props}
      >
        <span className="share-button-label">
          <i className="fas fa-share-alt" aria-hidden="true" />
          {children}
        </span>
      </Button>

      <div className="share-button-links" aria-label="Share links">
        {links.map((link, index) => {
          const sharedProps = {
            className: "share-button-link",
            "aria-label": link.label,
            title: link.label,
            style: {
              transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
            } as React.CSSProperties,
          }

          if (link.href) {
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                {...sharedProps}
              >
                <i className={link.iconClass} aria-hidden="true" />
              </a>
            )
          }

          return (
            <button
              key={link.label}
              type="button"
              onClick={async () => {
                await link.onClick?.()
                hide()
              }}
              {...sharedProps}
            >
              <i className={link.iconClass} aria-hidden="true" />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ShareButton
