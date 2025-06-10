import React from 'react';
import jsPDF from 'jspdf';
import { useResume } from '../contexts/ResumeContext';

export function generateResumePDF(resumeData) {
  let y = 20;
  let left = 18;
  const pageWidth = 210;
  const pageHeight = 297;
  let right = pageWidth - left;
  const bottomMargin = 20;
  const doc = new jsPDF({ unit: 'mm', format: [pageWidth, pageHeight] });
  y = 20;
  // Draw border on the first page
  doc.setDrawColor(100, 100, 100);
  doc.setLineWidth(0.5);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20, 'S');
  // Helper to check for page overflow and add new page if needed
  const checkPage = (extra = 0) => {
    if (y + extra > pageHeight - bottomMargin) {
      doc.addPage();
      doc.setDrawColor(100, 100, 100);
      doc.setLineWidth(0.5);
      doc.rect(10, 10, pageWidth - 20, pageHeight - 20, 'S');
      y = 20;
      doc.setFont('times', '');
    }
  };
  doc.setFont('times', '');
  doc.setDrawColor(100, 100, 100);
  doc.setLineWidth(0.5);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20, 'S');
  doc.setFontSize(22);
  doc.setFont('times', 'bold');
  doc.text(resumeData.personalInfo.fullName || 'Your Name', 105, y, { align: 'center' });
  y += 5;
  doc.setFontSize(11);
  doc.setFont('times', 'normal');
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
    y += 5;
  }
  if (linkedin && website) {
    const linkText = `${linkedin}    |    ${website}`;
    const linkWidth = doc.getTextWidth(linkText);
    const xCenter = 105 - linkWidth / 2;
    doc.setTextColor(0, 0, 255); // Blue
    doc.textWithLink(linkedin, xCenter, y, { url: linkedin });
    const linkedinWidth = doc.getTextWidth(linkedin);
    doc.setTextColor(0, 0, 0); // Black for separator
    doc.text('    |    ', xCenter + linkedinWidth, y);
    doc.setTextColor(0, 0, 255); // Blue
    doc.textWithLink(website, xCenter + linkedinWidth + doc.getTextWidth('    |    '), y, { url: website });
    doc.setTextColor(0, 0, 0); // Reset to black
    y += 5;
  } else if (linkedin) {
    doc.setTextColor(0, 0, 255); // Blue
    doc.textWithLink(linkedin, 105, y, { align: 'center', url: linkedin });
    doc.setTextColor(0, 0, 0); // Reset to black
    y += 5;
  } else if (website) {
    doc.setTextColor(0, 0, 255); // Blue
    doc.textWithLink(website, 105, y, { align: 'center', url: website });
    doc.setTextColor(0, 0, 0); // Reset to black
    y += 5;
  }
  y += 2;
  doc.setDrawColor(200, 200, 200);
  doc.line(18, y-2, pageWidth - 18, y-2);
  y += 4;
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };
  if (resumeData.personalInfo.summary) {
    doc.setFontSize(13);
    doc.setFont('times', 'bold');
    doc.text('PROFESSIONAL SUMMARY', left, y);
    y += 8;
    doc.setFont('times', 'normal');
    doc.setFontSize(11);
    const summaryPara = resumeData.personalInfo.summary.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    const summaryLines = doc.splitTextToSize(summaryPara, right - left);
    summaryLines.forEach(line => {
      checkPage(5);
      doc.text(line, left + 4, y);
      y += 5;
    });
    y += 2;
    checkPage(4);
    doc.setDrawColor(200, 200, 200);
    doc.line(left, y-2, pageWidth - left, y-2);
    y += 4;
  }
  if (resumeData.experience && resumeData.experience.length > 0) {
    doc.setFontSize(13);
    doc.setFont('times', 'bold');
    doc.text('PROFESSIONAL EXPERIENCE', left, y);
    y += 8;
    doc.setFont('times', 'normal');
    doc.setFontSize(11);
    resumeData.experience.forEach(exp => {
      checkPage(6);
      doc.setFont('times', 'bold');
      doc.text(`${exp.position || ''} @ ${exp.company || ''}`, left, y);
      doc.setFont('times', 'normal');
      let dateLoc = [];
      if (exp.startDate || exp.endDate) {
        let start = exp.startDate ? formatDate(exp.startDate) : '';
        let end = exp.current ? 'Present' : (exp.endDate ? formatDate(exp.endDate) : '');
        dateLoc.push([start, end].filter(Boolean).join(' - '));
      }
      if (exp.location) dateLoc.push(exp.location);
      doc.text(dateLoc.join(' | '), right, y, { align: 'right' });
      y += 6;
      if (exp.description) {
        const descPara = exp.description.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
        const descLines = doc.splitTextToSize(descPara, right - left - 4);
        descLines.forEach(line => {
          checkPage(5);
          doc.text(line, left + 4, y);
          y += 5;
        });
        y += 2;
      } else {
        y += 2;
      }
    });
    checkPage(6);
    doc.setDrawColor(200, 200, 200);
    doc.line(left, y-2, pageWidth - left, y-2);
    y += 6;
  }
  if (resumeData.education && resumeData.education.length > 0) {
    doc.setFontSize(13);
    doc.setFont('times', 'bold');
    doc.text('EDUCATION', left, y);
    y += 8;
    doc.setFont('times', 'normal');
    doc.setFontSize(11);
    resumeData.education.forEach(edu => {
      checkPage(6);
      doc.setFont('times', 'bold');
      doc.text(`${edu.degree || ''} ${edu.field ? 'in ' + edu.field : ''}`, left, y);
      doc.setFont('times', 'normal');
      let dateLoc = [];
      if (edu.startDate) dateLoc.push(formatDate(edu.startDate));
      if (edu.endDate) dateLoc.push(formatDate(edu.endDate));
      if (edu.location) dateLoc.push(edu.location);
      doc.text(dateLoc.join(' - '), right, y, { align: 'right' });
      y += 6;
      checkPage(5);
      doc.text(edu.institution || '', left + 4, y);
      if (edu.gpa) doc.text(`GPA: ${edu.gpa}`, right, y, { align: 'right' });
      y += 5;
      if (edu.description) {
        const descLines = doc.splitTextToSize(edu.description, right - left - 4);
        descLines.forEach(line => {
          checkPage(5);
          doc.text(line, left + 4, y);
          y += 5;
        });
        y += 2;
      } else {
        y += 2;
      }
    });
    checkPage(6);
    doc.setDrawColor(200, 200, 200);
    doc.line(left, y-2, pageWidth - left, y-2);
    y += 6;
  }
  if (resumeData.skills && resumeData.skills.length > 0) {
    doc.setFontSize(13);
    doc.setFont('times', 'bold');
    doc.text('SKILLS', left, y);
    y += 8;
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
        checkPage(5);
        doc.setFont('times', 'bold');
        doc.text(`${categoryNames[cat]}:`, left + 4, y);
        doc.setFont('times', 'normal');
        doc.text(catSkills.map(s => s.name).join(', '), left + 4 + doc.getTextWidth(`${categoryNames[cat]}:   `), y);
        y += 5;
      }
    });
    y += 2;
    checkPage(6);
    doc.setDrawColor(200, 200, 200);
    doc.line(left, y-2, pageWidth - left, y-2);
    y += 6;
  }
  if (resumeData.projects && resumeData.projects.length > 0) {
    doc.setFontSize(13);
    doc.setFont('times', 'bold');
    doc.text('PROJECTS', left, y);
    y += 8;
    doc.setFont('times', 'normal');
    doc.setFontSize(11);
    resumeData.projects.forEach(proj => {
      checkPage(6);
      doc.setFont('times', 'bold');
      doc.text(proj.name || '', left, y);
      doc.setFont('times', 'normal');
      let dateLoc = [];
      if (proj.startDate) dateLoc.push(formatDate(proj.startDate));
      if (proj.endDate) dateLoc.push(formatDate(proj.endDate));
      doc.text(dateLoc.join(' - '), right, y, { align: 'right' });
      y += 6;
      if (proj.technologies) {
        checkPage(5);
        doc.text(`Technologies: ${proj.technologies}`, left + 4, y);
        y += 5;
      }
      if (proj.description) {
        const descPara = proj.description.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
        const descLines = doc.splitTextToSize(descPara, right - left - 10);
        if (descLines.length > 0) {
          checkPage(5);
          doc.text(`• ${descLines[0]}`, left + 4, y);
          y += 5;
          for (let i = 1; i < descLines.length; i++) {
            checkPage(5);
            doc.text(descLines[i], left + 10, y);
            y += 5;
          }
        }
        y += 2;
      }
      let linkX = left + 4;
      if (proj.url && proj.github) {
        // Both links present, show in one line
        doc.setTextColor(0, 0, 255); // Blue
        doc.textWithLink(`Live: ${proj.url}`, linkX, y, { url: proj.url });
        const liveWidth = doc.getTextWidth(`Live: ${proj.url}`);
        doc.setTextColor(0, 0, 0); // Black for separator
        doc.text('    |    ', linkX + liveWidth, y);
        doc.setTextColor(0, 0, 255); // Blue
        doc.textWithLink(`GitHub: ${proj.github}`, linkX + liveWidth + doc.getTextWidth('    |    '), y, { url: proj.github });
        doc.setTextColor(0, 0, 0); // Reset to black
        y += 5;
      } else if (proj.url) {
        doc.setTextColor(0, 0, 255); // Blue
        doc.textWithLink(`Live: ${proj.url}`, linkX, y, { url: proj.url });
        doc.setTextColor(0, 0, 0); // Reset to black
        y += 5;
      } else if (proj.github) {
        doc.setTextColor(0, 0, 255); // Blue
        doc.textWithLink(`GitHub: ${proj.github}`, linkX, y, { url: proj.github });
        doc.setTextColor(0, 0, 0); // Reset to black
        y += 5;
      }
      y += 2;
    });
    checkPage(6);
    doc.setDrawColor(200, 200, 200);
    doc.line(left, y-2, pageWidth - left, y-2);
    y += 6;
  }
  // Achievements & Awards section (excluding certifications)
  if (resumeData.achievements && resumeData.achievements.some(ach => ach.type !== 'certification')) {
    doc.setFontSize(13);
    doc.setFont('times', 'bold');
    doc.text('ACHIEVEMENTS & AWARDS', left, y);
    y += 8;
    doc.setFont('times', 'normal');
    doc.setFontSize(11);
    resumeData.achievements.filter(ach => ach.type !== 'certification').forEach(ach => {
      checkPage(6);
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
          checkPage(5);
          doc.text(line, left + 4, y);
          y += 5;
        });
        y += 2;
      } else {
        y += 2;
      }
    });
    checkPage(6);
    doc.setDrawColor(200, 200, 200);
    doc.line(left, y-2, pageWidth - left, y-2);
    y += 6;
  }
  // Certifications section
  if (resumeData.achievements && resumeData.achievements.some(ach => ach.type === 'certification')) {
    doc.setFontSize(13);
    doc.setFont('times', 'bold');
    doc.text('CERTIFICATIONS', left, y);
    y += 8;
    doc.setFont('times', 'normal');
    doc.setFontSize(11);
    resumeData.achievements.filter(ach => ach.type === 'certification').forEach(ach => {
      checkPage(6);
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
          checkPage(5);
          doc.text(line, left + 4, y);
          y += 5;
        });
        y += 2;
      } else {
        y += 2;
      }
    });
    checkPage(6);
    doc.setDrawColor(200, 200, 200);
    doc.line(left, y-2, pageWidth - left, y-2);
    y += 6;
  }
  return doc;
}

function PDFGenerator({ children }) {
  const { resumeData } = useResume();

  const handleDownload = () => {
    const doc = generateResumePDF(resumeData);
    doc.save(`${resumeData.personalInfo.fullName}_Resume.pdf`);
  };

  return (
    <div onClick={handleDownload} style={{ display: 'inline' }}>
      {children}
    </div>
  );
}

export default PDFGenerator;