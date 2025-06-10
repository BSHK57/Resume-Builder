import React from 'react';
import { useResume } from '../contexts/ResumeContext';

function ResumePreview() {
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

  const leftPad = 'pl-2';
  const sectionTitle = 'text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2 mt-6';
  const label = 'font-semibold text-gray-800';
  const value = 'text-gray-700';

  return (
    <div id="resume-preview" className="bg-white p-8 max-w-3xl mx-auto text-[15px] leading-relaxed text-gray-900" style={{fontFamily: 'Helvetica, Arial, sans-serif'}}>
      {/* Header */}
      <div className="text-center mb-2">
        <h1 className="text-3xl font-bold tracking-tight mb-1">{resumeData.personalInfo.fullName || 'Your Name'}</h1>
        <div className="text-gray-700 text-sm">
          {[
            resumeData.personalInfo.email,
            resumeData.personalInfo.phone,
            resumeData.personalInfo.location,
            resumeData.personalInfo.linkedin,
            resumeData.personalInfo.website
          ].filter(Boolean).join(' | ')}
        </div>
      </div>
      <hr className="my-4 border-gray-200" />

      {/* Professional Summary */}
      {resumeData.personalInfo.summary && (
        <div>
          <div className={sectionTitle}>Professional Summary</div>
          <div className={value}>{resumeData.personalInfo.summary}</div>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div>
          <div className={sectionTitle}>Professional Experience</div>
          {resumeData.experience.map((exp, i) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between">
                <span className={label}>{exp.position || ''} @ {exp.company || ''}</span>
                <span className="text-gray-500 text-sm">{[
                  exp.startDate ? formatDate(exp.startDate) : '',
                  exp.endDate ? (exp.current ? 'Present' : formatDate(exp.endDate)) : '',
                  exp.location
                ].filter(Boolean).join(' | ')}</span>
              </div>
              {exp.description && (
                <ul className="list-disc ml-6 mt-1 text-gray-700">
                  {exp.description.split('\n').map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div>
          <div className={sectionTitle}>Education</div>
          {resumeData.education.map((edu, i) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between">
                <span className={label}>{edu.degree || ''} {edu.field ? 'in ' + edu.field : ''}</span>
                <span className="text-gray-500 text-sm">{[
                  edu.startDate ? formatDate(edu.startDate) : '',
                  edu.endDate ? formatDate(edu.endDate) : '',
                  edu.location
                ].filter(Boolean).join(' | ')}</span>
              </div>
              <div className="flex justify-between">
                <span className={leftPad}>{edu.institution}</span>
                {edu.gpa && <span className="text-gray-500 text-sm">GPA: {edu.gpa}</span>}
              </div>
              {edu.description && (
                <ul className="list-disc ml-6 mt-1 text-gray-700">
                  {edu.description.split('\n').map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div>
          <div className={sectionTitle}>Skills</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {['technical', 'tools', 'soft', 'languages'].map(cat => {
              const catSkills = resumeData.skills.filter(s => s.category === cat);
              if (!catSkills.length) return null;
              const categoryNames = {
                technical: 'Technical Skills',
                tools: 'Tools & Software',
                soft: 'Soft Skills',
                languages: 'Languages'
              };
              return (
                <div key={cat} className="mb-1">
                  <span className="font-semibold text-gray-800">{categoryNames[cat]}:</span> <span className={value}>{catSkills.map(s => s.name).join(', ')}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Projects */}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <div>
          <div className={sectionTitle}>Projects</div>
          {resumeData.projects.map((proj, i) => (
            <div key={proj.id} className="mb-3">
              <div className="flex justify-between">
                <span className={label}>{proj.name}</span>
                <span className="text-gray-500 text-sm">{[
                  proj.startDate ? formatDate(proj.startDate) : '',
                  proj.endDate ? formatDate(proj.endDate) : ''
                ].filter(Boolean).join(' - ')}</span>
              </div>
              {proj.technologies && <div className={leftPad}><span className="font-semibold">Technologies:</span> <span className={value}>{proj.technologies}</span></div>}
              {proj.description && (
                <ul className="list-disc ml-6 mt-1 text-gray-700">
                  {proj.description.split('\n').map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-4 mt-1 ml-2 text-sm">
                {proj.url && <span className="text-blue-700">Live: {proj.url}</span>}
                {proj.github && <span className="text-blue-700">GitHub: {proj.github}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {resumeData.achievements && resumeData.achievements.length > 0 && (
        <div>
          <div className={sectionTitle}>Achievements & Awards</div>
          {resumeData.achievements.map((ach, i) => (
            <div key={ach.id} className="mb-3">
              <div className="flex justify-between">
                <span className={label}>{ach.title}</span>
                <span className="text-gray-500 text-sm">{[
                  ach.date ? formatDate(ach.date) : '',
                  ach.organization
                ].filter(Boolean).join(' | ')}</span>
              </div>
              {ach.description && (
                <ul className="list-disc ml-6 mt-1 text-gray-700">
                  {ach.description.split('\n').map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResumePreview;