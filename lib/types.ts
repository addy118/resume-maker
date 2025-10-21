export type SectionType = "header" | "summary" | "experience" | "education" | "skills" | "projects" | "certifications"

export interface ResumeSection {
  id: string
  type: SectionType
  title: string
  content: Record<string, any>
  order: number
  visible: boolean
}

export interface Resume {
  id: string
  title: string
  template: "modern" | "classic" | "minimal"
  sections: ResumeSection[]
  createdAt: string
  updatedAt: string
}

export interface ShareData {
  resume: Resume
  sharedAt: string
}
