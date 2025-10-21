"use client"

import type { Resume } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

interface ResumeListProps {
  resumes: Resume[]
  onCreateResume: () => void
  onSelectResume: (resume: Resume) => void
  onDeleteResume: (id: string) => void
}

export default function ResumeList({ resumes, onCreateResume, onSelectResume, onDeleteResume }: ResumeListProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Resume Maker</h1>
          <p className="text-muted-foreground">Create and manage your professional resumes</p>
        </div>

        <Button onClick={onCreateResume} size="lg" className="mb-8">
          <Plus className="w-4 h-4 mr-2" />
          Create New Resume
        </Button>

        {resumes.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No resumes yet. Create one to get started!</p>
            <Button onClick={onCreateResume}>Create Your First Resume</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumes.map((resume) => (
              <Card
                key={resume.id}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onSelectResume(resume)}
              >
                <h3 className="font-semibold text-lg mb-2">{resume.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{resume.sections.length} sections</p>
                <p className="text-xs text-muted-foreground mb-4">
                  Updated: {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectResume(resume)
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteResume(resume.id)
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
