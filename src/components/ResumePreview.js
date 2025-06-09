import React from 'react';
import { useResume } from '../contexts/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar, ExternalLink, Github } from 'lucide-react';

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

  return (
    <div id="resume-preview" className="bg-white p-8 shadow-lg max-w-4xl mx-auto" style={{ fontSize: '14px', lineHeight: '1.4' }}>
      {/* Header */}
      <header className="text-center border-b-2 border-gray-300 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {resumeData.personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {resumeData.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{resumeData.personalInfo.email}</span>
            </div>
          )}
          {resumeData.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{resumeData.personalInfo.phone}</span>
            </div>
          )}
          {resumeData.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{resumeData.personalInfo.location}</span>
            </div>
          )}
          {resumeData.personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" />
              <span>{resumeData.personalInfo.linkedin}</span>
            </div>
          )}
          {resumeData.personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span>{resumeData.personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {resumeData.personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {resumeData.personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-blue-200 pl-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-1 mt-1 sm:mt-0">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                    {exp.location && <span className="ml-2">• {exp.location}</span>}
                  </div>
                </div>
                {exp.description && (
                  <div className="text-gray-700 mt-2">
                    {exp.description.split('\n').map((line, index) => (
                      <p key={index} className="mb-1">{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
            Education
          </h2>
          <div className="space-y-3">
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-green-200 pl-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-gray-700">{edu.institution}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-1 mt-1 sm:mt-0">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDateRange(edu.startDate, edu.endDate)}</span>
                    {edu.location && <span className="ml-2">• {edu.location}</span>}
                  </div>
                </div>
                {edu.description && (
                  <p className="text-gray-700 mt-2 text-sm">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['technical', 'tools', 'soft', 'languages'].map(category => {
              const categorySkills = resumeData.skills.filter(skill => skill.category === category);
              if (categorySkills.length === 0) return null;
              
              const categoryNames = {
                technical: 'Technical Skills',
                tools: 'Tools & Software',
                soft: 'Soft Skills',
                languages: 'Languages'
              };
              
              return (
                <div key={category}>
                  <h3 className="font-semibold text-gray-900 mb-2">{categoryNames[category]}</h3>
                  <div className="flex flex-wrap gap-1">
                    {categorySkills.map((skill, index) => (
                      <span key={skill.id} className="text-gray-700">
                        {skill.name}
                        {index < categorySkills.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Projects */}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
            Projects
          </h2>
          <div className="space-y-4">
            {resumeData.projects.map((project) => (
              <div key={project.id} className="border-l-2 border-purple-200 pl-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    {project.technologies && (
                      <p className="text-sm text-gray-600 italic">Technologies: {project.technologies}</p>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-1 mt-1 sm:mt-0">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDateRange(project.startDate, project.endDate)}</span>
                  </div>
                </div>
                {project.description && (
                  <p className="text-gray-700 mt-2">{project.description}</p>
                )}
                <div className="flex gap-4 mt-2 text-sm">
                  {project.url && (
                    <div className="flex items-center gap-1 text-blue-600">
                      <ExternalLink className="h-3 w-3" />
                      <span>Live Demo</span>
                    </div>
                  )}
                  {project.github && (
                    <div className="flex items-center gap-1 text-blue-600">
                      <Github className="h-3 w-3" />
                      <span>Source Code</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {resumeData.achievements && resumeData.achievements.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
            Achievements & Awards
          </h2>
          <div className="space-y-3">
            {resumeData.achievements.map((achievement) => (
              <div key={achievement.id} className="border-l-2 border-yellow-200 pl-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                    {achievement.organization && (
                      <p className="text-gray-700">{achievement.organization}</p>
                    )}
                  </div>
                  {achievement.date && (
                    <div className="text-sm text-gray-600 flex items-center gap-1 mt-1 sm:mt-0">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(achievement.date)}</span>
                    </div>
                  )}
                </div>
                {achievement.description && (
                  <p className="text-gray-700 mt-2 text-sm">{achievement.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ResumePreview;