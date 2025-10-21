import type { Resume } from "./types"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export const generatePDF = async (resume: Resume): Promise<void> => {
  const html = generateHTML(resume)
  const element = document.createElement("div")
  element.innerHTML = html
  element.style.display = "none"
  document.body.appendChild(element)

  const canvas = await html2canvas(element, { scale: 2 })
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  const imgData = canvas.toDataURL("image/png")
  const imgWidth = 210
  const imgHeight = (canvas.height * imgWidth) / canvas.width
  let heightLeft = imgHeight
  let position = 0

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
  heightLeft -= 297

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight
    pdf.addPage()
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
    heightLeft -= 297
  }

  pdf.save(`${resume.title}.pdf`)
  document.body.removeChild(element)
}

const generateHTML = (resume: Resume): string => {
  const sections = resume.sections.filter((s) => s.visible).sort((a, b) => a.order - b.order)

  let html = `
    <div style="font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto;">
  `

  for (const section of sections) {
    if (section.type === "header") {
      html += `
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px;">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">${section.content.fullName}</h1>
          <p style="margin: 5px 0; color: #666;">
            ${section.content.email} | ${section.content.phone} | ${section.content.location}
            ${section.content.website ? `| ${section.content.website}` : ""}
          </p>
        </div>
      `
    } else if (section.type === "summary") {
      html += `
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 14px; font-weight: bold; margin: 0 0 10px 0; text-transform: uppercase;">${section.title}</h2>
          <p style="margin: 0; line-height: 1.6; color: #333;">${section.content.text}</p>
        </div>
      `
    } else if (section.type === "experience") {
      html += `<div style="margin-bottom: 20px;">
        <h2 style="font-size: 14px; font-weight: bold; margin: 0 0 10px 0; text-transform: uppercase;">${section.title}</h2>`
      for (const item of section.content.items || []) {
        html += `
          <div style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <strong style="font-size: 12px;">${item.position} at ${item.company}</strong>
              <span style="font-size: 11px; color: #666;">${item.startDate} - ${item.endDate}</span>
            </div>
            <p style="margin: 0; font-size: 11px; line-height: 1.5; color: #333;">${item.description}</p>
          </div>
        `
      }
      html += `</div>`
    } else if (section.type === "education") {
      html += `<div style="margin-bottom: 20px;">
        <h2 style="font-size: 14px; font-weight: bold; margin: 0 0 10px 0; text-transform: uppercase;">${section.title}</h2>`
      for (const item of section.content.items || []) {
        html += `
          <div style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between;">
              <strong style="font-size: 12px;">${item.degree} in ${item.field}</strong>
              <span style="font-size: 11px; color: #666;">${item.graduationDate}</span>
            </div>
            <p style="margin: 0; font-size: 11px; color: #666;">${item.school}</p>
          </div>
        `
      }
      html += `</div>`
    } else if (section.type === "skills") {
      html += `
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 14px; font-weight: bold; margin: 0 0 10px 0; text-transform: uppercase;">${section.title}</h2>
          <p style="margin: 0; font-size: 11px; line-height: 1.6; color: #333;">
            ${(section.content.items || []).join(" • ")}
          </p>
        </div>
      `
    } else if (section.type === "projects") {
      html += `<div style="margin-bottom: 20px;">
        <h2 style="font-size: 14px; font-weight: bold; margin: 0 0 10px 0; text-transform: uppercase;">${section.title}</h2>`
      for (const item of section.content.items || []) {
        html += `
          <div style="margin-bottom: 10px;">
            <strong style="font-size: 12px;">${item.name}</strong>
            <p style="margin: 5px 0 0 0; font-size: 11px; line-height: 1.5; color: #333;">${item.description}</p>
          </div>
        `
      }
      html += `</div>`
    } else if (section.type === "certifications") {
      html += `<div style="margin-bottom: 20px;">
        <h2 style="font-size: 14px; font-weight: bold; margin: 0 0 10px 0; text-transform: uppercase;">${section.title}</h2>`
      for (const item of section.content.items || []) {
        html += `
          <div style="margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between;">
              <strong style="font-size: 12px;">${item.name}</strong>
              <span style="font-size: 11px; color: #666;">${item.date}</span>
            </div>
            <p style="margin: 0; font-size: 11px; color: #666;">${item.issuer}</p>
          </div>
        `
      }
      html += `</div>`
    }
  }

  html += `</div>`
  return html
}
