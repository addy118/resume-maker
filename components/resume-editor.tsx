"use client"

import { useState } from "react"
import type { Resume } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import ResumePreview from "./resume-preview"
import SectionEditor from "./section-editor"
import SectionList from "./section-list"
import TemplateSelector from "./template-selector"
import ShareModal from "./share-modal"

interface ResumeEditorProps {
  resume: Resume
  onSave: (resume: Resume) => void
  onBack: () => void
}

export default function ResumeEditor({ resume, onSave, onBack }: ResumeEditorProps) {
  const [currentResume, setCurrentResume] = useState(resume)
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null)
  const [showShareModal, setShowShareModal] = useState(false)

  const handleSave = () => {
    onSave(currentResume)
  }

  const handleTemplateChange = (template: Resume["template"]) => {
    const updated = { ...currentResume, template }
    setCurrentResume(updated)
    onSave(updated)
  }

  const handleExport = async () => {
    try {
      const { generatePDF } = await import("@/lib/pdf-export")
      await generatePDF(currentResume)
    } catch (error) {
      console.error("PDF export failed:", error)
      alert("PDF export requires jsPDF and html2canvas libraries")
    }
  }

  const selectedSection = currentResume.sections.find((s) => s.id === selectedSectionId)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{currentResume.title}</h1>
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date(currentResume.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" onClick={() => setShowShareModal(true)}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Template Selector */}
        <div className="mb-6">
          <TemplateSelector currentTemplate={currentResume.template} onTemplateChange={handleTemplateChange} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Section List */}
          <div className="lg:col-span-1">
            <SectionList
              resume={currentResume}
              selectedSectionId={selectedSectionId}
              onSelectSection={setSelectedSectionId}
              onUpdateResume={setCurrentResume}
              onSave={handleSave}
            />
          </div>

          {/* Middle: Section Editor */}
          <div className="lg:col-span-1">
            {selectedSection ? (
              <SectionEditor
                section={selectedSection}
                onUpdate={(content) => {
                  const updated = {
                    ...currentResume,
                    sections: currentResume.sections.map((s) => (s.id === selectedSection.id ? { ...s, content } : s)),
                  }
                  setCurrentResume(updated)
                  handleSave()
                }}
              />
            ) : (
              <Card className="p-6 text-center text-muted-foreground">Select a section to edit</Card>
            )}
          </div>

          {/* Right: Preview */}
          <div className="lg:col-span-1">
            <ResumePreview resume={currentResume} />
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && <ShareModal resume={currentResume} onClose={() => setShowShareModal(false)} />}
    </div>
  )
}
