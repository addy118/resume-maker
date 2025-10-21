"use client"

import { useState } from "react"
import type { Resume } from "@/lib/types"
import { storage } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, Copy, Check } from "lucide-react"

interface ShareModalProps {
  resume: Resume
  onClose: () => void
}

export default function ShareModal({ resume, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const encoded = storage.encodeResume(resume)
  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}?resume=${encoded}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Share Resume</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">Share this link to let others view your resume:</p>

        <div className="flex gap-2 mb-4">
          <Input value={shareUrl} readOnly className="text-sm" />
          <Button size="icon" onClick={handleCopy} variant="outline">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          Anyone with this link can view your resume. The resume data is encoded in the URL.
        </p>

        <Button onClick={onClose} className="w-full">
          Done
        </Button>
      </Card>
    </div>
  )
}
