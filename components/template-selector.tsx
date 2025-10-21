"use client"

import type { Resume } from "@/lib/types"
import { Button } from "@/components/ui/button"

interface TemplateSelectorProps {
  currentTemplate: Resume["template"]
  onTemplateChange: (template: Resume["template"]) => void
}

export default function TemplateSelector({ currentTemplate, onTemplateChange }: TemplateSelectorProps) {
  const templates: Array<{ id: Resume["template"]; name: string; description: string }> = [
    {
      id: "modern",
      name: "Modern",
      description: "Contemporary design with gradient header",
    },
    {
      id: "classic",
      name: "Classic",
      description: "Traditional professional format",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean and simple layout",
    },
  ]

  return (
    <div>
      <h3 className="font-semibold mb-3">Resume Template</h3>
      <div className="grid grid-cols-3 gap-3">
        {templates.map((template) => (
          <Button
            key={template.id}
            variant={currentTemplate === template.id ? "default" : "outline"}
            className="h-auto flex flex-col items-start p-3"
            onClick={() => onTemplateChange(template.id)}
          >
            <span className="font-semibold text-sm">{template.name}</span>
            <span className="text-xs text-muted-foreground">{template.description}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
