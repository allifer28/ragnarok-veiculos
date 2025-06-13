"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, LinkIcon, Check } from "lucide-react"

interface ShareButtonsProps {
  title: string
  url?: string
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [currentUrl, setCurrentUrl] = useState<string>("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setCurrentUrl(url || window.location.href)
  }, [url])

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, "_blank")
  }

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
      "_blank",
    )
  }

  const shareOnLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, "_blank")
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white border-none"
        onClick={shareOnFacebook}
      >
        <Facebook className="h-4 w-4 mr-2" />
        Facebook
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white border-none"
        onClick={shareOnTwitter}
      >
        <Twitter className="h-4 w-4 mr-2" />
        Twitter
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white border-none"
        onClick={shareOnLinkedin}
      >
        <Linkedin className="h-4 w-4 mr-2" />
        LinkedIn
      </Button>

      <Button variant="outline" size="sm" onClick={copyToClipboard}>
        {copied ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            Copiado!
          </>
        ) : (
          <>
            <LinkIcon className="h-4 w-4 mr-2" />
            Copiar Link
          </>
        )}
      </Button>
    </div>
  )
}
