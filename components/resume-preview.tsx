"use client"

import type { Resume } from "@/lib/types"
import { Card } from "@/components/ui/card"

interface ResumePreviewProps {
  resume: Resume
}

export default function ResumePreview({ resume }: ResumePreviewProps) {
  const sections = resume.sections.filter((s) => s.visible).sort((a, b) => a.order - b.order)

  const getTemplateStyles = () => {
    switch (resume.template) {
      case "classic":
        return {
          container: "bg-white border-2 border-gray-800",
          header: "border-b-2 border-gray-800 pb-4 mb-4",
          sectionTitle: "text-sm font-bold uppercase border-b border-gray-800 pb-2 mb-2",
        }
      case "minimal":
        return {
          container: "bg-white",
          header: "pb-4 mb-4",
          sectionTitle: "text-sm font-bold uppercase pb-2 mb-2",
        }
      default: // modern
        return {
          container: "bg-white shadow-lg",
          header: "bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-lg mb-4",
          sectionTitle: "text-sm font-bold uppercase text-blue-600 pb-2 mb-2 border-b-2 border-blue-200",
        }
    }
  }

  const styles = getTemplateStyles()

  return (
    <Card className={`p-6 sticky top-6 max-h-[calc(100vh-100px)] overflow-y-auto ${styles.container}`}>
      {sections.map((section) => (
        <div key={section.id} className="mb-4">
          {section.type === "header" ? (
            <div className={styles.header}>
              <h1 className="text-2xl font-bold">{section.content.fullName}</h1>
              <p className="text-sm mt-1">
                {section.content.email} • {section.content.phone}
              </p>
              <p className="text-sm">
                {section.content.location}
                {section.content.website && ` • ${section.content.website}`}
              </p>
            </div>
          ) : (
            <>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              {section.type === "summary" && <p className="text-xs leading-relaxed">{section.content.text}</p>}
              {section.type === "experience" && (
                <div className="space-y-2">
                  {section.content.items?.map((item: any) => (
                    <div key={item.id} className="text-xs">
                      <div className="font-semibold">
                        {item.position} at {item.company}
                      </div>
                      <div className="text-gray-600">
                        {item.startDate} - {item.endDate}
                      </div>
                      <div className="text-gray-700 mt-1">{item.description}</div>
                    </div>
                  ))}
                </div>
              )}
              {section.type === "education" && (
                <div className="space-y-2">
                  {section.content.items?.map((item: any) => (
                    <div key={item.id} className="text-xs">
                      <div className="font-semibold">
                        {item.degree} in {item.field}
                      </div>
                      <div className="text-gray-600">{item.school}</div>
                      <div className="text-gray-600">{item.graduationDate}</div>
                    </div>
                  ))}
                </div>
              )}
              {section.type === "skills" && (
                <div className="text-xs">
                  <p>{section.content.items?.join(" • ")}</p>
                </div>
              )}
              {section.type === "projects" && (
                <div className="space-y-2">
                  {section.content.items?.map((item: any) => (
                    <div key={item.id} className="text-xs">
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-gray-700">{item.description}</div>
                    </div>
                  ))}
                </div>
              )}
              {section.type === "certifications" && (
                <div className="space-y-2">
                  {section.content.items?.map((item: any) => (
                    <div key={item.id} className="text-xs">
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-gray-600">
                        {item.issuer} • {item.date}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </Card>
  )
}
