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

  const generatePDF = () => {
    let y = 20;
    const left = 18;
    const right = 192;
    const lineHeight = 4;
    let maxY = y;
    let maxLineWidth = right - left;
    const simulateY = () => {
      let ySim = 20;
      ySim += lineHeight;
      if (resumeData.personalInfo.email || resumeData.personalInfo.phone || resumeData.personalInfo.location) ySim += lineHeight;
      if (resumeData.personalInfo.linkedin) ySim += 5;
      if (resumeData.personalInfo.website) ySim += 5;
      ySim += 2 + 4;
      if (resumeData.personalInfo.summary) {
        ySim += lineHeight + 2;
        const summaryPara = resumeData.personalInfo.summary.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
        const tempDoc = new jsPDF({ unit: 'mm', format: 'a4' });
        tempDoc.setFont('times', 'normal');
        tempDoc.setFontSize(11);
        const summaryLines = tempDoc.splitTextToSize(summaryPara, right - left);
        ySim += summaryLines.length * 5 + 2 + 4;
      }
      if (resumeData.experience && resumeData.experience.length > 0) {
        ySim += lineHeight + 2;
        resumeData.experience.forEach(exp => {
          ySim += 6;
          if (exp.description) {
            const descPara = exp.description.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
            const tempDoc = new jsPDF({ unit: 'mm', format: 'a4' });
            tempDoc.setFont('times', 'normal');
            tempDoc.setFontSize(11);
            const descLines = tempDoc.splitTextToSize(descPara, right - left - 4);
            ySim += descLines.length * 5 + 2;
          } else {
            ySim += 2;
          }
        });
        ySim += 6;
      }
      if (resumeData.education && resumeData.education.length > 0) {
        ySim += lineHeight + 2;
        resumeData.education.forEach(edu => {
          ySim += 6 + 5;
          if (edu.description) {
            const tempDoc = new jsPDF({ unit: 'mm', format: 'a4' });
            tempDoc.setFont('times', 'normal');
            tempDoc.setFontSize(11);
            const descLines = tempDoc.splitTextToSize(edu.description, right - left - 4);
            ySim += descLines.length * 5 + 2;
          } else {
            ySim += 2;
          }
        });
        ySim += 6;
      }
      if (resumeData.skills && resumeData.skills.length > 0) {
        ySim += lineHeight + 2;
        const categories = ['technical', 'tools', 'soft', 'languages'];
        categories.forEach(cat => {
          const catSkills = resumeData.skills.filter(s => s.category === cat);
          if (catSkills.length > 0) ySim += 5;
        });
        ySim += 2 + 6;
      }
      if (resumeData.projects && resumeData.projects.length > 0) {
        ySim += lineHeight + 2;
        resumeData.projects.forEach(proj => {
          ySim += 6;
          if (proj.technologies) ySim += 5;
          if (proj.description) {
            const descPara = proj.description.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
            const tempDoc = new jsPDF({ unit: 'mm', format: 'a4' });
            tempDoc.setFont('times', 'normal');
            tempDoc.setFontSize(11);
            const descLines = tempDoc.splitTextToSize(descPara, right - left - 10);
            ySim += 5 + (descLines.length - 1) * 5 + 2;
          }
          if (proj.url) ySim += 5;
          if (proj.github) ySim += 5;
          ySim += 2;
        });
        ySim += 6;
      }
      if (resumeData.achievements && resumeData.achievements.length > 0) {
        ySim += lineHeight + 2;
        resumeData.achievements.forEach(ach => {
          ySim += 6;
          if (ach.description) {
            const tempDoc = new jsPDF({ unit: 'mm', format: 'a4' });
            tempDoc.setFont('times', 'normal');
            tempDoc.setFontSize(11);
            const descLines = tempDoc.splitTextToSize(ach.description, right - left - 4);
            ySim += descLines.length * 5 + 2;
          } else {
            ySim += 2;
          }
        });
        ySim += 6;
      }
      return ySim;
    };
    maxY = simulateY();
    const pageWidth = Math.max(210, maxLineWidth + 36);
    const pageHeight = Math.max(297, maxY + 20);
    const doc = new jsPDF({ unit: 'mm', format: [pageWidth, pageHeight] });
    y = 20;
    doc.setFont('times', '');
    doc.setDrawColor(100, 100, 100);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20, 'S');
    doc.setFontSize(22);
    doc.setFont('times', 'bold');
    doc.text(resumeData.personalInfo.fullName || 'Your Name', 105, y, { align: 'center' });
    y += lineHeight+2;
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
      y += lineHeight+1;
    }
    if (linkedin && website) {
      const linkText = `${linkedin}    |    ${website}`;
      const linkWidth = doc.getTextWidth(linkText);
      const xCenter = 105 - linkWidth / 2;
      doc.textWithLink(linkedin, xCenter, y, { url: linkedin });
      const linkedinWidth = doc.getTextWidth(linkedin);
      doc.text('    |    ', xCenter + linkedinWidth, y);
      doc.textWithLink(website, xCenter + linkedinWidth + doc.getTextWidth('    |    '), y, { url: website });
      y += 5;
    } else if (linkedin) {
      doc.textWithLink(linkedin, 105, y, { align: 'center', url: linkedin });
      y += 5;
    } else if (website) {
      doc.textWithLink(website, 105, y, { align: 'center', url: website });
      y += 5;
    }
    y += 2;
    doc.setDrawColor(200, 200, 200);
    doc.line(18, y-2, pageWidth - 18, y-2);
    y += 4;
    if (resumeData.personalInfo.summary) {
      doc.setFontSize(13);
      doc.setFont('times', 'bold');
      doc.text('PROFESSIONAL SUMMARY', left, y);
      y += lineHeight + 2;
      doc.setFont('times', 'normal');
      doc.setFontSize(11);
      const summaryPara = resumeData.personalInfo.summary.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
      const summaryLines = doc.splitTextToSize(summaryPara, right - left);
      summaryLines.forEach(line => {
        doc.text(line, left + 4, y);
        y += 5;
      });
      y += 2;
      doc.setDrawColor(200, 200, 200);
      doc.line(left, y-2, pageWidth - left, y-2);
      y += 4;
    }
    if (resumeData.experience && resumeData.experience.length > 0) {
      doc.setFontSize(13);
      doc.setFont('times', 'bold');
      doc.text('PROFESSIONAL EXPERIENCE', left, y);
      y += lineHeight + 2;
      doc.setFont('times', 'normal');
      doc.setFontSize(11);
      resumeData.experience.forEach(exp => {
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
            doc.text(line, left + 4, y);
            y += 5;
          });
          y += 2;
        } else {
          y += 2;
        }
      });
      doc.setDrawColor(200, 200, 200);
      doc.line(left, y-2, pageWidth - left, y-2);
      y += 6;
    }
    if (resumeData.education && resumeData.education.length > 0) {
      doc.setFontSize(13);
      doc.setFont('times', 'bold');
      doc.text('EDUCATION', left, y);
      y += lineHeight + 2;
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
            doc.text(line, left + 4, y);
            y += 5;
          });
          y += 2;
        } else {
          y += 2;
        }
      });
      doc.setDrawColor(200, 200, 200);
      doc.line(left, y-2, pageWidth - left, y-2);
      y += 6;
    }
    if (resumeData.skills && resumeData.skills.length > 0) {
      doc.setFontSize(13);
      doc.setFont('times', 'bold');
      doc.text('SKILLS', left, y);
      y += lineHeight + 2;
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
          doc.setFont('times', 'bold');
          doc.text(`${categoryNames[cat]}:`, left + 4, y);
          doc.setFont('times', 'normal');
          doc.text(catSkills.map(s => s.name).join(', '), left + 4 + doc.getTextWidth(`${categoryNames[cat]}:   `), y);
          y += 5;
        }
      });
      y += 2;
      doc.setDrawColor(200, 200, 200);
      doc.line(left, y-2, pageWidth - left, y-2);
      y += 6;
    }
    if (resumeData.projects && resumeData.projects.length > 0) {
      doc.setFontSize(13);
      doc.setFont('times', 'bold');
      doc.text('PROJECTS', left, y);
      y += lineHeight + 2;
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
          y += 2;
        }
        if (proj.url) {
          doc.textWithLink(`Live: ${proj.url}`, left + 4, y, { url: proj.url });
          y += 5;
        }
        if (proj.github) {
          doc.textWithLink(`GitHub: ${proj.github}`, left + 4, y, { url: proj.github });
          y += 5;
        }
        y += 2;
      });
      doc.setDrawColor(200, 200, 200);
      doc.line(left, y-2, pageWidth - left, y-2);
      y += 6;
    }
    if (resumeData.achievements && resumeData.achievements.length > 0) {
      doc.setFontSize(13);
      doc.setFont('times', 'bold');
      doc.text('ACHIEVEMENTS & AWARDS', left, y);
      y += lineHeight + 2;
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
            doc.text(line, left + 4, y);
            y += 5;
          });
          y += 2;
        } else {
          y += 2;
        }
      });
      doc.setDrawColor(200, 200, 200);
      doc.line(left, y-2, pageWidth - left, y-2);
      y += 6;
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