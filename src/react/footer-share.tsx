import React, { useEffect, useMemo, useState } from "react"
import { createRoot } from "react-dom/client"
import ShareButton from "../components/ui/ShareButton"
import "./footer-share.css"

function FooterShare() {
  const [copied, setCopied] = useState(false)
  const currentUrl = useMemo(() => window.location.href, [])
  const shareMessage = useMemo(
    () => `Check out Arjun Vasudev's portfolio: ${currentUrl}`,
    [currentUrl]
  )

  useEffect(() => {
    if (!copied) return

    const timeout = window.setTimeout(() => {
      setCopied(false)
    }, 1800)

    return () => window.clearTimeout(timeout)
  }, [copied])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
    } catch {
      const textArea = document.createElement("textarea")
      textArea.value = currentUrl
      textArea.setAttribute("readonly", "")
      textArea.style.position = "absolute"
      textArea.style.left = "-9999px"
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
    }

    setCopied(true)
  }

  const links = useMemo(
    () => [
      {
        iconClass: "fas fa-link",
        onClick: copyLink,
        label: "Copy portfolio link",
      },
      {
        iconClass: "fab fa-whatsapp",
        href: `https://wa.me/?text=${encodeURIComponent(shareMessage)}`,
        label: "Share on WhatsApp",
      },
      {
        iconClass: "fab fa-linkedin-in",
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
        label: "Share on LinkedIn",
      },
      {
        iconClass: "fas fa-envelope",
        href: `mailto:?subject=${encodeURIComponent("Arjun Vasudev Portfolio")}&body=${encodeURIComponent(shareMessage)}`,
        label: "Share by email",
      },
    ],
    [currentUrl, shareMessage]
  )

  return (
    <div className="footer-share-panel">
      <p className="footer-share-kicker">Pass It On</p>
      <ShareButton links={links}>
        {copied ? "Link Copied" : "Share Portfolio"}
      </ShareButton>
      <p className="footer-share-copy">
        Send the portfolio to collaborators, clients, or friends in one move.
      </p>
    </div>
  )
}

const rootElement = document.getElementById("footer-share-root")

if (rootElement) {
  const root = createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <FooterShare />
    </React.StrictMode>
  )
}
