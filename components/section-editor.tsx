"use client"

import type { ResumeSection } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

interface SectionEditorProps {
  section: ResumeSection
  onUpdate: (content: Record<string, any>) => void
}

export default function SectionEditor({ section, onUpdate }: SectionEditorProps) {
  const handleHeaderChange = (field: string, value: string) => {
    onUpdate({
      ...section.content,
      [field]: value,
    })
  }

  const handleSummaryChange = (text: string) => {
    onUpdate({ text })
  }

  const handleItemChange = (itemId: string, field: string, value: string) => {
    const items = section.content.items || []
    onUpdate({
      items: items.map((item: any) => (item.id === itemId ? { ...item, [field]: value } : item)),
    })
  }

  const handleAddItem = () => {
    const items = section.content.items || []
    const newItem = getNewItem(section.type)
    onUpdate({ items: [...items, newItem] })
  }

  const handleRemoveItem = (itemId: string) => {
    const items = section.content.items || []
    onUpdate({ items: items.filter((item: any) => item.id !== itemId) })
  }

  const handleSkillsChange = (value: string) => {
    onUpdate({
      items: value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    })
  }

  const getNewItem = (type: ResumeSection["type"]) => {
    switch (type) {
      case "experience":
        return {
          id: `exp-${Date.now()}`,
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
        }
      case "education":
        return {
          id: `edu-${Date.now()}`,
          school: "",
          degree: "",
          field: "",
          graduationDate: "",
        }
      case "projects":
        return {
          id: `proj-${Date.now()}`,
          name: "",
          description: "",
          link: "",
        }
      case "certifications":
        return {
          id: `cert-${Date.now()}`,
          name: "",
          issuer: "",
          date: "",
        }
      default:
        return {}
    }
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">{section.title}</h3>

      {section.type === "header" && (
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold">Full Name</label>
            <Input
              value={section.content.fullName || ""}
              onChange={(e) => handleHeaderChange("fullName", e.target.value)}
              placeholder="Your Name"
              className="text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold">Email</label>
            <Input
              value={section.content.email || ""}
              onChange={(e) => handleHeaderChange("email", e.target.value)}
              placeholder="email@example.com"
              className="text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold">Phone</label>
            <Input
              value={section.content.phone || ""}
              onChange={(e) => handleHeaderChange("phone", e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold">Location</label>
            <Input
              value={section.content.location || ""}
              onChange={(e) => handleHeaderChange("location", e.target.value)}
              placeholder="City, State"
              className="text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold">Website</label>
            <Input
              value={section.content.website || ""}
              onChange={(e) => handleHeaderChange("website", e.target.value)}
              placeholder="yourwebsite.com"
              className="text-sm"
            />
          </div>
        </div>
      )}

      {section.type === "summary" && (
        <div>
          <label className="text-xs font-semibold">Summary</label>
          <textarea
            value={section.content.text || ""}
            onChange={(e) => handleSummaryChange(e.target.value)}
            placeholder="Write your professional summary..."
            className="w-full p-2 border rounded text-sm min-h-24 font-sans"
          />
        </div>
      )}

      {section.type === "experience" && (
        <div className="space-y-4">
          {(section.content.items || []).map((item: any) => (
            <div key={item.id} className="p-3 border rounded space-y-2">
              <Input
                value={item.company || ""}
                onChange={(e) => handleItemChange(item.id, "company", e.target.value)}
                placeholder="Company"
                className="text-sm"
              />
              <Input
                value={item.position || ""}
                onChange={(e) => handleItemChange(item.id, "position", e.target.value)}
                placeholder="Position"
                className="text-sm"
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="month"
                  value={item.startDate || ""}
                  onChange={(e) => handleItemChange(item.id, "startDate", e.target.value)}
                  className="text-sm"
                />
                <Input
                  type="month"
                  value={item.endDate || ""}
                  onChange={(e) => handleItemChange(item.id, "endDate", e.target.value)}
                  placeholder="Present"
                  className="text-sm"
                />
              </div>
              <textarea
                value={item.description || ""}
                onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                placeholder="Description"
                className="w-full p-2 border rounded text-sm min-h-16 font-sans"
              />
              <Button variant="destructive" size="sm" onClick={() => handleRemoveItem(item.id)}>
                <Trash2 className="w-3 h-3 mr-1" />
                Remove
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={handleAddItem} className="w-full bg-transparent">
            <Plus className="w-3 h-3 mr-1" />
            Add Experience
          </Button>
        </div>
      )}

      {section.type === "education" && (
        <div className="space-y-4">
          {(section.content.items || []).map((item: any) => (
            <div key={item.id} className="p-3 border rounded space-y-2">
              <Input
                value={item.school || ""}
                onChange={(e) => handleItemChange(item.id, "school", e.target.value)}
                placeholder="School/University"
                className="text-sm"
              />
              <Input
                value={item.degree || ""}
                onChange={(e) => handleItemChange(item.id, "degree", e.target.value)}
                placeholder="Degree"
                className="text-sm"
              />
              <Input
                value={item.field || ""}
                onChange={(e) => handleItemChange(item.id, "field", e.target.value)}
                placeholder="Field of Study"
                className="text-sm"
              />
              <Input
                type="month"
                value={item.graduationDate || ""}
                onChange={(e) => handleItemChange(item.id, "graduationDate", e.target.value)}
                className="text-sm"
              />
              <Button variant="destructive" size="sm" onClick={() => handleRemoveItem(item.id)}>
                <Trash2 className="w-3 h-3 mr-1" />
                Remove
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={handleAddItem} className="w-full bg-transparent">
            <Plus className="w-3 h-3 mr-1" />
            Add Education
          </Button>
        </div>
      )}

      {section.type === "skills" && (
        <div>
          <label className="text-xs font-semibold">Skills (comma-separated)</label>
          <textarea
            value={(section.content.items || []).join(", ")}
            onChange={(e) => handleSkillsChange(e.target.value)}
            placeholder="Skill 1, Skill 2, Skill 3..."
            className="w-full p-2 border rounded text-sm min-h-20 font-sans"
          />
        </div>
      )}

      {section.type === "projects" && (
        <div className="space-y-4">
          {(section.content.items || []).map((item: any) => (
            <div key={item.id} className="p-3 border rounded space-y-2">
              <Input
                value={item.name || ""}
                onChange={(e) => handleItemChange(item.id, "name", e.target.value)}
                placeholder="Project Name"
                className="text-sm"
              />
              <textarea
                value={item.description || ""}
                onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                placeholder="Description"
                className="w-full p-2 border rounded text-sm min-h-16 font-sans"
              />
              <Input
                value={item.link || ""}
                onChange={(e) => handleItemChange(item.id, "link", e.target.value)}
                placeholder="Link (optional)"
                className="text-sm"
              />
              <Button variant="destructive" size="sm" onClick={() => handleRemoveItem(item.id)}>
                <Trash2 className="w-3 h-3 mr-1" />
                Remove
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={handleAddItem} className="w-full bg-transparent">
            <Plus className="w-3 h-3 mr-1" />
            Add Project
          </Button>
        </div>
      )}

      {section.type === "certifications" && (
        <div className="space-y-4">
          {(section.content.items || []).map((item: any) => (
            <div key={item.id} className="p-3 border rounded space-y-2">
              <Input
                value={item.name || ""}
                onChange={(e) => handleItemChange(item.id, "name", e.target.value)}
                placeholder="Certification Name"
                className="text-sm"
              />
              <Input
                value={item.issuer || ""}
                onChange={(e) => handleItemChange(item.id, "issuer", e.target.value)}
                placeholder="Issuer"
                className="text-sm"
              />
              <Input
                type="month"
                value={item.date || ""}
                onChange={(e) => handleItemChange(item.id, "date", e.target.value)}
                className="text-sm"
              />
              <Button variant="destructive" size="sm" onClick={() => handleRemoveItem(item.id)}>
                <Trash2 className="w-3 h-3 mr-1" />
                Remove
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={handleAddItem} className="w-full bg-transparent">
            <Plus className="w-3 h-3 mr-1" />
            Add Certification
          </Button>
        </div>
      )}
    </Card>
  )
}
