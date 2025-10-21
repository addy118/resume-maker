import type { Resume, ResumeSection } from "./types"

export const createNewResume = (title = "My Resume"): Resume => {
  const id = Date.now().toString()
  const now = new Date().toISOString()

  return {
    id,
    title,
    template: "modern",
    sections: [
      {
        id: "header-" + id,
        type: "header",
        title: "Header",
        content: {
          fullName: "Your Name",
          email: "your.email@example.com",
          phone: "+1 (555) 000-0000",
          location: "City, State",
          website: "yourwebsite.com",
        },
        order: 0,
        visible: true,
      },
      {
        id: "summary-" + id,
        type: "summary",
        title: "Professional Summary",
        content: {
          text: "Brief professional summary highlighting your key strengths and career objectives.",
        },
        order: 1,
        visible: true,
      },
      {
        id: "experience-" + id,
        type: "experience",
        title: "Experience",
        content: {
          items: [
            {
              id: "exp-1",
              company: "Company Name",
              position: "Job Title",
              startDate: "2023-01",
              endDate: "Present",
              description: "Key responsibilities and achievements",
            },
          ],
        },
        order: 2,
        visible: true,
      },
      {
        id: "education-" + id,
        type: "education",
        title: "Education",
        content: {
          items: [
            {
              id: "edu-1",
              school: "University Name",
              degree: "Degree",
              field: "Field of Study",
              graduationDate: "2023-05",
            },
          ],
        },
        order: 3,
        visible: true,
      },
      {
        id: "skills-" + id,
        type: "skills",
        title: "Skills",
        content: {
          items: ["Skill 1", "Skill 2", "Skill 3", "Skill 4"],
        },
        order: 4,
        visible: true,
      },
    ],
    createdAt: now,
    updatedAt: now,
  }
}

export const addSection = (resume: Resume, type: Exclude<ResumeSection["type"], "header">): Resume => {
  const newSection: ResumeSection = {
    id: `${type}-${Date.now()}`,
    type,
    title: type.charAt(0).toUpperCase() + type.slice(1),
    content: getDefaultContent(type),
    order: Math.max(...resume.sections.map((s) => s.order), -1) + 1,
    visible: true,
  }

  return {
    ...resume,
    sections: [...resume.sections, newSection],
    updatedAt: new Date().toISOString(),
  }
}

export const removeSection = (resume: Resume, sectionId: string): Resume => {
  return {
    ...resume,
    sections: resume.sections.filter((s) => s.id !== sectionId),
    updatedAt: new Date().toISOString(),
  }
}

export const updateSection = (resume: Resume, sectionId: string, content: Record<string, any>): Resume => {
  return {
    ...resume,
    sections: resume.sections.map((s) => (s.id === sectionId ? { ...s, content } : s)),
    updatedAt: new Date().toISOString(),
  }
}

export const reorderSections = (resume: Resume, sections: ResumeSection[]): Resume => {
  return {
    ...resume,
    sections: sections.map((s, idx) => ({ ...s, order: idx })),
    updatedAt: new Date().toISOString(),
  }
}

export const toggleSectionVisibility = (resume: Resume, sectionId: string): Resume => {
  return {
    ...resume,
    sections: resume.sections.map((s) => (s.id === sectionId ? { ...s, visible: !s.visible } : s)),
    updatedAt: new Date().toISOString(),
  }
}

const getDefaultContent = (type: ResumeSection["type"]): Record<string, any> => {
  switch (type) {
    case "summary":
      return { text: "Add your professional summary here." }
    case "experience":
      return {
        items: [
          {
            id: `exp-${Date.now()}`,
            company: "Company Name",
            position: "Job Title",
            startDate: "",
            endDate: "",
            description: "",
          },
        ],
      }
    case "education":
      return {
        items: [
          {
            id: `edu-${Date.now()}`,
            school: "School Name",
            degree: "Degree",
            field: "Field",
            graduationDate: "",
          },
        ],
      }
    case "skills":
      return { items: [] }
    case "projects":
      return {
        items: [
          {
            id: `proj-${Date.now()}`,
            name: "Project Name",
            description: "Project description",
            link: "",
          },
        ],
      }
    case "certifications":
      return {
        items: [
          {
            id: `cert-${Date.now()}`,
            name: "Certification Name",
            issuer: "Issuer",
            date: "",
          },
        ],
      }
    default:
      return {}
  }
}
