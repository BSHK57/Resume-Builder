import React, { useEffect, useRef, useState } from 'react';
import { useResume } from '../contexts/ResumeContext';
import { generateResumePDF } from './PDFGenerator';

function ResumePreview() {
  const { resumeData } = useResume();
  const [pdfUrl, setPdfUrl] = useState(null);
  const pdfBlobUrl = useRef(null);

  useEffect(() => {
    if (pdfBlobUrl.current) {
      URL.revokeObjectURL(pdfBlobUrl.current);
      pdfBlobUrl.current = null;
    }
    // Use the shared PDF generator
    const doc = generateResumePDF(resumeData);
    const pdfBlob = doc.output('blob');
    pdfBlobUrl.current = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfBlobUrl.current);
    // eslint-disable-next-line
  }, [resumeData]);

  return (
    <div style={{ width: '100%', height: '900px', background: '#fff' }}>
      {pdfUrl && (
        <iframe
          title="Resume PDF Preview"
          src={pdfUrl}
          style={{ width: '100%', height: '100%', border: 'none' }}
          // sandbox="allow-scripts"
        />
      )}
    </div>
  );
}

export default ResumePreview;