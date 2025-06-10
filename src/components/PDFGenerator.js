import React from 'react';
import jsPDF from 'jspdf';
import { useResume } from '../contexts/ResumeContext';

function PDFGenerator({ children }) {
  const { resumeData } = useResume();

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const formatDateRange = (startDate, endDate, current) => {
    const start = formatDate(startDate);
    const end = current ? 'Present' : formatDate(endDate);
    return `${start}${end ? ` - ${end}` : ''}`;
  };

  const generatePDF = () => {
    // Dynamically calculate page size based on content
    let y = 20;
    const left = 18;
    const right = 192;
    const lineHeight = 4;
    let maxY = y;
    let maxLineWidth = right - left;
    // Use a temporary jsPDF instance to measure content height and width
    const tempDoc = new jsPDF({ unit: 'mm', format: 'a4' });
    tempDoc.setFont('times', '');
    // --- simulate all content rendering, updating maxY and maxLineWidth as needed ---
    // For brevity, only simulate vertical growth (y) and max line width
    // (In a real implementation, you'd repeat the rendering logic here)
    // We'll estimate a large enough page for now
    // ---
    // Now create the real doc with the new size
    const pageWidth = Math.max(210, maxLineWidth + 36); // 18mm margin each side
    const pageHeight = Math.max(297, y + 200); // Add extra for content
    const doc = new jsPDF({ unit: 'mm', format: [pageWidth, pageHeight] });
    y = 20;
    // Set font to Times New Roman
    doc.setFont('times', '');

    // Draw border around the page
    doc.setDrawColor(100, 100, 100);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20, 'S');

    // Header: Name
    doc.setFontSize(22);
    doc.setFont('times', 'bold');
    // Center the name
    doc.text(resumeData.personalInfo.fullName || 'Your Name', 105, y, { align: 'center' });
    y += lineHeight;
    doc.setFontSize(11);
    doc.setFont('times', 'normal');
    // Center the contact info, but put LinkedIn and Portfolio on new lines
    let contactArr = [
      resumeData.personalInfo.email,
      resumeData.personalInfo.phone,
      resumeData.personalInfo.location
    ].filter(Boolean);
    let contactStr = contactArr.join(' | ');
    let linkedin = resumeData.personalInfo.linkedin;
    let website = resumeData.personalInfo.website;
    if (contactStr) {
      doc.text(contactStr, 105, y, { align: 'center' });
      y += lineHeight;
    }
    if (linkedin) {
      doc.text(linkedin, 105, y, { align: 'center' });
      y += 5;
    }
    if (website) {
      doc.text(website, 105, y, { align: 'center' });
      y += 5;
    }
    y += 2;
    doc.setDrawColor(200, 200, 200);
    doc.line(18, y-2, pageWidth - 18, y-2);
    y += 4;

    // Professional Summary
    if (resumeData.personalInfo.summary) {
      doc.setFontSize(13);
      doc.setFont('times', 'bold');
      doc.text('PROFESSIONAL SUMMARY', left, y);
      y += lineHeight + 2; // Increased spacing after header
      doc.setFont('times', 'normal');
      doc.setFontSize(11);
      const summaryPara = resumeData.personalInfo.summary.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
      const summaryLines = doc.splitTextToSize(summaryPara, right - left);
      summaryLines.forEach(line => {
        doc.text(line, left + 4, y);
        y += 5;
      });
      y += 2; // Extra gap after summary block
      // After Professional Summary
      doc.setDrawColor(200, 200, 200);
      doc.line(left, y-2, pageWidth - left, y-2);
      y += 4; // Increased gap after the line for separation
    }

    // Experience
    if (resumeData.experience && resumeData.experience.length > 0) {
      doc.setFontSize(13);
      doc.setFont('times', 'bold');
      doc.text('PROFESSIONAL EXPERIENCE', left, y);
      y += lineHeight + 2; // Increased spacing after header
      doc.setFont('times', 'normal');
      doc.setFontSize(11);
      resumeData.experience.forEach(exp => {
        doc.setFont('times', 'bold');
        doc.text(`${exp.position || ''} @ ${exp.company || ''}`, left, y);
        doc.setFont('times', 'normal');
        let dateLoc = [];
        if (exp.startDate) dateLoc.push(formatDate(exp.startDate));
        if (exp.endDate) dateLoc.push(formatDate(exp.endDate));
        if (exp.current) dateLoc[1] = 'Present';
        if (exp.location) dateLoc.push(exp.location);
        doc.text(dateLoc.join(' | '), right, y, { align: 'right' });
        y += 6;
        if (exp.description) {
          const descPara = exp.description.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
          const descLines = doc.splitTextToSize(descPara, right - left - 4);
          descLines.forEach(line => {
            doc.text(line, left + 4, y);
            y += 5;
          });
          y += 2; // Extra gap after description block
        } else {
          y += 2;
        }
      });
      doc.setDrawColor(200, 200, 200);
      doc.line(left, y-2, pageWidth - left, y-2);
      y += 6; // Increased gap after the line for separation
    }

    // Education
    if (resumeData.education && resumeData.education.length > 0) {
      doc.setFontSize(13);
      doc.setFont('times', 'bold');
      doc.text('EDUCATION', left, y);
      y += lineHeight + 2; // Increased spacing after header
      doc.setFont('times', 'normal');
      doc.setFontSize(11);
      resumeData.education.forEach(edu => {
        doc.setFont('times', 'bold');
        doc.text(`${edu.degree || ''} ${edu.field ? 'in ' + edu.field : ''}`, left, y);
        doc.setFont('times', 'normal');
        let dateLoc = [];
        if (edu.startDate) dateLoc.push(formatDate(edu.startDate));
        if (edu.endDate) dateLoc.push(formatDate(edu.endDate));
        if (edu.location) dateLoc.push(edu.location);
        doc.text(dateLoc.join(' - '), right, y, { align: 'right' });
        y += 6;
        doc.text(edu.institution || '', left + 4, y);
        if (edu.gpa) doc.text(`GPA: ${edu.gpa}`, right, y, { align: 'right' });
        y += 5;
        if (edu.description) {
          const descLines = doc.splitTextToSize(edu.description, right - left - 4);
          descLines.forEach(line => {
            doc.text(`• ${line}`, left + 4, y);
            y += 5;
          });
          y += 2; // Extra gap after description block
        } else {
          y += 2;
        }
      });
      doc.setDrawColor(200, 200, 200);
      doc.line(left, y-2, pageWidth - left, y-2);
      y += 6; // Increased gap after the line for separation
    }

    // Skills
    if (resumeData.skills && resumeData.skills.length > 0) {
      doc.setFontSize(13);
      doc.setFont('times', 'bold');
      doc.text('SKILLS', left, y);
      y += lineHeight + 2; // Increased spacing after header
      doc.setFont('times', 'normal');
      doc.setFontSize(11);
      const categories = ['technical', 'tools', 'soft', 'languages'];
      const categoryNames = {
        technical: 'Technical Skills',
        tools: 'Tools & Software',
        soft: 'Soft Skills',
        languages: 'Languages'
      };
      categories.forEach(cat => {
        const catSkills = resumeData.skills.filter(s => s.category === cat);
        if (catSkills.length > 0) {
          doc.text(`${categoryNames[cat]}: ${catSkills.map(s => s.name).join(', ')}`, left + 4, y);
          y += 5;
        }
      });
      y += 2;
      doc.setDrawColor(200, 200, 200);
      doc.line(left, y-2, pageWidth - left, y-2);
      y += 6; // Increased gap after the line for separation
    }

    // Projects
    if (resumeData.projects && resumeData.projects.length > 0) {
      doc.setFontSize(13);
      doc.setFont('times', 'bold');
      doc.text('PROJECTS', left, y);
      y += lineHeight + 2; // Increased spacing after header
      doc.setFont('times', 'normal');
      doc.setFontSize(11);
      resumeData.projects.forEach(proj => {
        doc.setFont('times', 'bold');
        doc.text(proj.name || '', left, y);
        doc.setFont('times', 'normal');
        let dateLoc = [];
        if (proj.startDate) dateLoc.push(formatDate(proj.startDate));
        if (proj.endDate) dateLoc.push(formatDate(proj.endDate));
        doc.text(dateLoc.join(' - '), right, y, { align: 'right' });
        y += 6;
        if (proj.technologies) {
          doc.text(`Technologies: ${proj.technologies}`, left + 4, y);
          y += 5;
        }
        if (proj.description) {
          const descPara = proj.description.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
          const descLines = doc.splitTextToSize(descPara, right - left - 10);
          doc.text(`• ${descLines[0]}`, left + 4, y);
          y += 5;
          for (let i = 1; i < descLines.length; i++) {
            doc.text(descLines[i], left + 10, y);
            y += 5;
          }
          y += 2; // Extra gap after description block
        }
        if (proj.url) {
          doc.text(`Live: ${proj.url}`, left + 4, y);
          y += 5;
        }
        if (proj.github) {
          doc.text(`GitHub: ${proj.github}`, left + 4, y);
          y += 5;
        }
        y += 2;
      });
      doc.setDrawColor(200, 200, 200);
      doc.line(left, y-2, pageWidth - left, y-2);
      y += 6; // Increased gap after the line for separation
    }

    // Achievements
    if (resumeData.achievements && resumeData.achievements.length > 0) {
      doc.setFontSize(13);
      doc.setFont('times', 'bold');
      doc.text('ACHIEVEMENTS & AWARDS', left, y);
      y += lineHeight + 2; // Increased spacing after header
      doc.setFont('times', 'normal');
      doc.setFontSize(11);
      resumeData.achievements.forEach(ach => {
        doc.setFont('times', 'bold');
        doc.text(ach.title || '', left, y);
        doc.setFont('times', 'normal');
        let dateLoc = [];
        if (ach.date) dateLoc.push(formatDate(ach.date));
        if (ach.organization) dateLoc.push(ach.organization);
        doc.text(dateLoc.join(' | '), right, y, { align: 'right' });
        y += 6;
        if (ach.description) {
          const descLines = doc.splitTextToSize(ach.description, right - left - 4);
          descLines.forEach(line => {
            doc.text(`• ${line}`, left + 4, y);
            y += 5;
          });
          y += 2; // Extra gap after description block
        } else {
          y += 2;
        }
      });
      doc.setDrawColor(200, 200, 200);
      doc.line(left, y-2, pageWidth - left, y-2);
      y += 6; // Increased gap after the line for separation
    }

    doc.save(`${resumeData.personalInfo.fullName}_Resume.pdf`);
  };

  return (
    <div onClick={generatePDF}>
      {children}
    </div>
  );
}

export default PDFGenerator;