import React, { useState } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { Plus, Trash2, GraduationCap, Calendar, MapPin } from 'lucide-react';

function EducationStep() {
  const { resumeData, updateEducation } = useResume();
  const [educations, setEducations] = useState(resumeData.education || []);

  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: ''
    };
    const updatedEducations = [...educations, newEducation];
    setEducations(updatedEducations);
    updateEducation(updatedEducations);
  };

  const removeEducation = (id) => {
    const updatedEducations = educations.filter(edu => edu.id !== id);
    setEducations(updatedEducations);
    updateEducation(updatedEducations);
  };

  const updateEducationField = (id, field, value) => {
    const updatedEducations = educations.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setEducations(updatedEducations);
    updateEducation(updatedEducations);
  };

  return (
    <div className="space-y-6 slide-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Education</h2>
          <p className="text-gray-600">Add your educational background</p>
        </div>
        <button
          onClick={addEducation}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Education</span>
        </button>
      </div>

      {educations.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No education added yet</p>
          <button
            onClick={addEducation}
            className="btn-secondary mt-4"
          >
            Add Your Education
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {educations.map((education, index) => (
            <div key={education.id} className="card border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Education {index + 1}
                </h3>
                <button
                  onClick={() => removeEducation(education.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <GraduationCap className="inline h-4 w-4 mr-1" />
                    Institution *
                  </label>
                  <input
                    type="text"
                    value={education.institution}
                    onChange={(e) => updateEducationField(education.id, 'institution', e.target.value)}
                    className="form-input"
                    placeholder="University/College Name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Degree *
                  </label>
                  <input
                    type="text"
                    value={education.degree}
                    onChange={(e) => updateEducationField(education.id, 'degree', e.target.value)}
                    className="form-input"
                    placeholder="Bachelor of Science"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Field of Study *
                  </label>
                  <input
                    type="text"
                    value={education.field}
                    onChange={(e) => updateEducationField(education.id, 'field', e.target.value)}
                    className="form-input"
                    placeholder="Computer Science"
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
                    value={education.location}
                    onChange={(e) => updateEducationField(education.id, 'location', e.target.value)}
                    className="form-input"
                    placeholder="City, State"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GPA (Optional)
                  </label>
                  <input
                    type="text"
                    value={education.gpa}
                    onChange={(e) => updateEducationField(education.id, 'gpa', e.target.value)}
                    className="form-input"
                    placeholder="3.8/4.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Start Date
                  </label>
                  <input
                    type="month"
                    value={education.startDate}
                    onChange={(e) => updateEducationField(education.id, 'startDate', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="month"
                    value={education.endDate}
                    onChange={(e) => updateEducationField(education.id, 'endDate', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Details
                </label>
                <textarea
                  value={education.description}
                  onChange={(e) => updateEducationField(education.id, 'description', e.target.value)}
                  className="form-textarea"
                  rows="3"
                  placeholder="Relevant coursework, honors, activities, thesis..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EducationStep;