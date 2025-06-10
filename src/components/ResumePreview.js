import React from 'react';
import { useResume } from '../contexts/ResumeContext';

function ResumePreview() {
  const { resumeData } = useResume();

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const sectionTitle = 'text-[15px] font-bold tracking-wider text-gray-900 mt-8 mb-2';
  const label = 'font-bold text-gray-900';
  const value = 'text-gray-800';
  const borderLine = 'border-t border-gray-300 my-3';
  const fontFamily = { fontFamily: 'Times New Roman, Times, serif' };

  return (
    <div id="resume-preview" className="bg-white p-8 max-w-3xl mx-auto text-[15px] leading-relaxed text-gray-900 h-[900px] overflow-y-auto shadow" style={fontFamily}>
      {/* Header */}
      <div className="text-center mb-2">
        <h1 className="text-3xl font-bold tracking-tight mb-1" style={fontFamily}>{resumeData.personalInfo.fullName || 'Your Name'}</h1>
        <div className="text-gray-700 text-sm" style={fontFamily}>
          {[resumeData.personalInfo.email, resumeData.personalInfo.phone, resumeData.personalInfo.location].filter(Boolean).join(' | ')}
        </div>
        {(resumeData.personalInfo.linkedin || resumeData.personalInfo.website) && (
          <div className="text-blue-700 text-sm mt-1 flex justify-center gap-2 flex-wrap" style={fontFamily}>
            {resumeData.personalInfo.linkedin && <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">{resumeData.personalInfo.linkedin}</a>}
            {resumeData.personalInfo.linkedin && resumeData.personalInfo.website && <span className="mx-1">|</span>}
            {resumeData.personalInfo.website && <a href={resumeData.personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">{resumeData.personalInfo.website}</a>}
          </div>
        )}
      </div>
      <hr className={borderLine} />

      {/* Professional Summary */}
      {resumeData.personalInfo.summary && (
        <div>
          <div className={sectionTitle} style={{...fontFamily, letterSpacing: 1}}>PROFESSIONAL SUMMARY</div>
          <div className={value} style={fontFamily}>{resumeData.personalInfo.summary}</div>
          <hr className={borderLine} />
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div>
          <div className={sectionTitle} style={{...fontFamily, letterSpacing: 1}}>PROFESSIONAL EXPERIENCE</div>
          {resumeData.experience.map((exp, i) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between">
                <span className={label} style={fontFamily}>{exp.position || ''} @ {exp.company || ''}</span>
                <span className="text-gray-500 text-sm" style={fontFamily}>
                  {[
                    (exp.startDate || exp.endDate) ? [exp.startDate ? formatDate(exp.startDate) : '', exp.current ? 'Present' : (exp.endDate ? formatDate(exp.endDate) : '')].filter(Boolean).join(' - ') : '',
                    exp.location
                  ].filter(Boolean).join(' | ')}
                </span>
              </div>
              {exp.description && (
                <div className={value} style={{...fontFamily, marginLeft: 16}}>{exp.description}</div>
              )}
            </div>
          ))}
          <hr className={borderLine} />
        </div>
      )}

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div>
          <div className={sectionTitle} style={{...fontFamily, letterSpacing: 1}}>EDUCATION</div>
          {resumeData.education.map((edu, i) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between">
                <span className={label} style={fontFamily}>{edu.degree || ''} {edu.field ? 'in ' + edu.field : ''}</span>
                <span className="text-gray-500 text-sm" style={fontFamily}>
                  {[
                    edu.startDate ? formatDate(edu.startDate) : '',
                    edu.endDate ? formatDate(edu.endDate) : '',
                    edu.location
                  ].filter(Boolean).join(' - ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{...fontFamily, marginLeft: 8}}>{edu.institution}</span>
                {edu.gpa && <span className="text-gray-500 text-sm">GPA: {edu.gpa}</span>}
              </div>
              {edu.description && (
                <div className={value} style={{...fontFamily, marginLeft: 16}}>{edu.description}</div>
              )}
            </div>
          ))}
          <hr className={borderLine} />
        </div>
      )}

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div>
          <div className={sectionTitle} style={{...fontFamily, letterSpacing: 1}}>SKILLS</div>
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
                  <span className="font-bold underline text-gray-900" style={fontFamily}>{categoryNames[cat]}:</span> <span className={value} style={fontFamily}>{catSkills.map(s => s.name).join(', ')}</span>
                </div>
              );
            })}
          </div>
          <hr className={borderLine} />
        </div>
      )}

      {/* Projects */}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <div>
          <div className={sectionTitle} style={{...fontFamily, letterSpacing: 1}}>PROJECTS</div>
          {resumeData.projects.map((proj, i) => (
            <div key={proj.id} className="mb-3">
              <div className="flex justify-between">
                <span className={label} style={fontFamily}>{proj.name}</span>
                <span className="text-gray-500 text-sm" style={fontFamily}>
                  {[
                    proj.startDate ? formatDate(proj.startDate) : '',
                    proj.endDate ? formatDate(proj.endDate) : ''
                  ].filter(Boolean).join(' - ')}
                </span>
              </div>
              {proj.technologies && <div style={{...fontFamily, marginLeft: 8}}><span className="font-semibold">Technologies:</span> <span className={value}>{proj.technologies}</span></div>}
              {proj.description && (
                <div className={value} style={{...fontFamily, marginLeft: 16}}>{proj.description}</div>
              )}
              <div className="flex flex-wrap gap-4 mt-1 ml-2 text-sm">
                {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Live: {proj.url}</a>}
                {proj.github && <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">GitHub: {proj.github}</a>}
              </div>
            </div>
          ))}
          <hr className={borderLine} />
        </div>
      )}

      {/* Achievements */}
      {resumeData.achievements && resumeData.achievements.length > 0 && (
        <div>
          <div className={sectionTitle} style={{...fontFamily, letterSpacing: 1}}>ACHIEVEMENTS & AWARDS</div>
          {resumeData.achievements.map((ach, i) => (
            <div key={ach.id} className="mb-3">
              <div className="flex justify-between">
                <span className={label} style={fontFamily}>{ach.title}</span>
                <span className="text-gray-500 text-sm" style={fontFamily}>
                  {[
                    ach.date ? formatDate(ach.date) : '',
                    ach.organization
                  ].filter(Boolean).join(' | ')}
                </span>
              </div>
              {ach.description && (
                <div className={value} style={{...fontFamily, marginLeft: 16}}>{ach.description}</div>
              )}
            </div>
          ))}
          <hr className={borderLine} />
        </div>
      )}
    </div>
  );
}

export default ResumePreview;