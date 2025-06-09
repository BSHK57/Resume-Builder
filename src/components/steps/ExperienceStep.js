import React, { useState } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { Plus, Trash2, Building, Calendar, MapPin } from 'lucide-react';

function ExperienceStep() {
  const { resumeData, updateExperience } = useResume();
  const [experiences, setExperiences] = useState(resumeData.experience || []);

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    const updatedExperiences = [...experiences, newExperience];
    setExperiences(updatedExperiences);
    updateExperience(updatedExperiences);
  };

  const removeExperience = (id) => {
    const updatedExperiences = experiences.filter(exp => exp.id !== id);
    setExperiences(updatedExperiences);
    updateExperience(updatedExperiences);
  };

  const updateExperienceField = (id, field, value) => {
    const updatedExperiences = experiences.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    setExperiences(updatedExperiences);
    updateExperience(updatedExperiences);
  };

  return (
    <div className="space-y-6 slide-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Experience</h2>
          <p className="text-gray-600">Add your professional experience</p>
        </div>
        <button
          onClick={addExperience}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No experience added yet</p>
          <button
            onClick={addExperience}
            className="btn-secondary mt-4"
          >
            Add Your First Experience
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="card border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Experience {index + 1}
                </h3>
                <button
                  onClick={() => removeExperience(experience.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="inline h-4 w-4 mr-1" />
                    Company *
                  </label>
                  <input
                    type="text"
                    value={experience.company}
                    onChange={(e) => updateExperienceField(experience.id, 'company', e.target.value)}
                    className="form-input"
                    placeholder="Company Name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position *
                  </label>
                  <input
                    type="text"
                    value={experience.position}
                    onChange={(e) => updateExperienceField(experience.id, 'position', e.target.value)}
                    className="form-input"
                    placeholder="Job Title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={experience.location}
                    onChange={(e) => updateExperienceField(experience.id, 'location', e.target.value)}
                    className="form-input"
                    placeholder="City, State"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Start Date *
                  </label>
                  <input
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => updateExperienceField(experience.id, 'startDate', e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => updateExperienceField(experience.id, 'endDate', e.target.value)}
                    className="form-input"
                    disabled={experience.current}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`current-${experience.id}`}
                    checked={experience.current}
                    onChange={(e) => updateExperienceField(experience.id, 'current', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`current-${experience.id}`} className="ml-2 text-sm text-gray-700">
                    I currently work here
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description
                </label>
                <textarea
                  value={experience.description}
                  onChange={(e) => updateExperienceField(experience.id, 'description', e.target.value)}
                  className="form-textarea"
                  rows="4"
                  placeholder="Describe your responsibilities, achievements, and key contributions..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use bullet points to highlight your key achievements and responsibilities
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExperienceStep;