"use client"

import { useState, useEffect } from "react"
import type { Resume } from "@/lib/types"
import { storage } from "@/lib/storage"
import { createNewResume } from "@/lib/resume-utils"
import ResumeEditor from "@/components/resume-editor"
import ResumeList from "@/components/resume-list"

export default function Home() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [currentResume, setCurrentResume] = useState<Resume | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadResumes = () => {
      const saved = storage.getAllResumes()
      setResumes(saved)

      const currentId = storage.getCurrentResumeId()
      if (currentId) {
        const resume = saved.find((r) => r.id === currentId)
        if (resume) {
          setCurrentResume(resume)
        }
      }
      setIsLoading(false)
    }

    loadResumes()
  }, [])

  const handleCreateResume = () => {
    const newResume = createNewResume()
    storage.saveResume(newResume)
    setResumes([...resumes, newResume])
    setCurrentResume(newResume)
  }

  const handleSelectResume = (resume: Resume) => {
    setCurrentResume(resume)
    storage.setCurrentResumeId(resume.id)
  }

  const handleDeleteResume = (id: string) => {
    storage.deleteResume(id)
    setResumes(resumes.filter((r) => r.id !== id))
    if (currentResume?.id === id) {
      setCurrentResume(null)
    }
  }

  const handleSaveResume = (resume: Resume) => {
    storage.saveResume(resume)
    setResumes(resumes.map((r) => (r.id === resume.id ? resume : r)))
    setCurrentResume(resume)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (currentResume) {
    return <ResumeEditor resume={currentResume} onSave={handleSaveResume} onBack={() => setCurrentResume(null)} />
  }

  return (
    <ResumeList
      resumes={resumes}
      onCreateResume={handleCreateResume}
      onSelectResume={handleSelectResume}
      onDeleteResume={handleDeleteResume}
    />
  )
}
