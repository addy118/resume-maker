"use client"

import type React from "react"

import { useState } from "react"
import type { Resume, ResumeSection } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, GripVertical, Eye, EyeOff, Trash2 } from "lucide-react"
import { addSection, removeSection, reorderSections, toggleSectionVisibility } from "@/lib/resume-utils"

interface SectionListProps {
  resume: Resume
  selectedSectionId: string | null
  onSelectSection: (id: string) => void
  onUpdateResume: (resume: Resume) => void
  onSave: () => void
}

export default function SectionList({
  resume,
  selectedSectionId,
  onSelectSection,
  onUpdateResume,
  onSave,
}: SectionListProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null)

  const handleAddSection = (type: Exclude<ResumeSection["type"], "header">) => {
    const updated = addSection(resume, type)
    onUpdateResume(updated)
    onSave()
  }

  const handleRemoveSection = (id: string) => {
    const updated = removeSection(resume, id)
    onUpdateResume(updated)
    onSave()
  }

  const handleToggleVisibility = (id: string) => {
    const updated = toggleSectionVisibility(resume, id)
    onUpdateResume(updated)
    onSave()
  }

  const handleDragStart = (id: string) => {
    setDraggedId(id)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (targetId: string) => {
    if (!draggedId || draggedId === targetId) return

    const draggedIndex = resume.sections.findIndex((s) => s.id === draggedId)
    const targetIndex = resume.sections.findIndex((s) => s.id === targetId)

    const newSections = [...resume.sections]
    const [draggedSection] = newSections.splice(draggedIndex, 1)
    newSections.splice(targetIndex, 0, draggedSection)

    const updated = reorderSections(resume, newSections)
    onUpdateResume(updated)
    onSave()
    setDraggedId(null)
  }

  const sortedSections = [...resume.sections].sort((a, b) => a.order - b.order)

  return (
    <Card className="p-4">
      <h2 className="font-semibold mb-4">Sections</h2>

      <div className="space-y-2 mb-4">
        {sortedSections.map((section) => (
          <div
            key={section.id}
            draggable={section.type !== "header"}
            onDragStart={() => handleDragStart(section.id)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(section.id)}
            className={`flex items-center gap-2 p-2 rounded border cursor-pointer transition-colors ${
              selectedSectionId === section.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background border-border hover:bg-muted"
            } ${section.type === "header" ? "cursor-default" : ""}`}
            onClick={() => onSelectSection(section.id)}
          >
            {section.type !== "header" && <GripVertical className="w-4 h-4 flex-shrink-0 opacity-50" />}
            <span className="flex-1 text-sm font-medium">{section.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleToggleVisibility(section.id)
              }}
              className="p-1 hover:bg-muted rounded"
            >
              {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 opacity-50" />}
            </button>
            {section.type !== "header" && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveSection(section.id)
                }}
                className="p-1 hover:bg-destructive hover:text-destructive-foreground rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground">Add Section</p>
        <div className="grid grid-cols-2 gap-2">
          {(["experience", "education", "skills", "projects", "certifications"] as const).map((type) => (
            <Button key={type} variant="outline" size="sm" onClick={() => handleAddSection(type)} className="text-xs">
              <Plus className="w-3 h-3 mr-1" />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  )
}
