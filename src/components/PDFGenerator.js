import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function PDFGenerator({ children }) {
  const generatePDF = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) {
      alert('Resume preview not found');
      return;
    }

    try {
      // Show loading state
      const button = document.querySelector('button');
      const originalText = button?.textContent;
      if (button) {
        button.textContent = 'Generating PDF...';
        button.disabled = true;
      }

      // Configure html2canvas options
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        height: element.scrollHeight,
        width: element.scrollWidth
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Calculate dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save('resume.pdf');

      // Reset button state
      if (button) {
        button.textContent = originalText;
        button.disabled = false;
      }
    } catch (error) {
      // console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
      
      // Reset button state
      const button = document.querySelector('button');
      if (button) {
        button.textContent = 'Download PDF';
        button.disabled = false;
      }
    }
  };

  return (
    <div onClick={generatePDF}>
      {children}
    </div>
  );
}

export default PDFGenerator;