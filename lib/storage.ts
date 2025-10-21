import type { Resume } from "./types"

const STORAGE_KEY = "resumes"
const CURRENT_RESUME_KEY = "currentResumeId"

export const storage = {
  getAllResumes: (): Resume[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  },

  getResume: (id: string): Resume | null => {
    const resumes = storage.getAllResumes()
    return resumes.find((r) => r.id === id) || null
  },

  saveResume: (resume: Resume): void => {
    const resumes = storage.getAllResumes()
    const index = resumes.findIndex((r) => r.id === resume.id)
    if (index >= 0) {
      resumes[index] = resume
    } else {
      resumes.push(resume)
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes))
    localStorage.setItem(CURRENT_RESUME_KEY, resume.id)
  },

  deleteResume: (id: string): void => {
    const resumes = storage.getAllResumes()
    const filtered = resumes.filter((r) => r.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  },

  getCurrentResumeId: (): string | null => {
    if (typeof window === "undefined") return null
    return localStorage.getItem(CURRENT_RESUME_KEY)
  },

  setCurrentResumeId: (id: string): void => {
    localStorage.setItem(CURRENT_RESUME_KEY, id)
  },

  encodeResume: (resume: Resume): string => {
    return btoa(JSON.stringify(resume))
  },

  decodeResume: (encoded: string): Resume | null => {
    try {
      return JSON.parse(atob(encoded))
    } catch {
      return null
    }
  },
}
