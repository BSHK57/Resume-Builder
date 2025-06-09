import React, { useState } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { Plus, Trash2, FolderOpen, ExternalLink, Github, Calendar } from 'lucide-react';

function ProjectsStep() {
  const { resumeData, updateProjects } = useResume();
  const [projects, setProjects] = useState(resumeData.projects || []);

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: '',
      description: '',
      technologies: '',
      startDate: '',
      endDate: '',
      url: '',
      github: '',
      highlights: []
    };
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    updateProjects(updatedProjects);
  };

  const removeProject = (id) => {
    const updatedProjects = projects.filter(proj => proj.id !== id);
    setProjects(updatedProjects);
    updateProjects(updatedProjects);
  };

  const updateProjectField = (id, field, value) => {
    const updatedProjects = projects.map(proj =>
      proj.id === id ? { ...proj, [field]: value } : proj
    );
    setProjects(updatedProjects);
    updateProjects(updatedProjects);
  };

  return (
    <div className="space-y-6 slide-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Projects</h2>
          <p className="text-gray-600">Showcase your notable projects and contributions</p>
        </div>
        <button
          onClick={addProject}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No projects added yet</p>
          <button
            onClick={addProject}
            className="btn-secondary mt-4"
          >
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={project.id} className="card border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Project {index + 1}
                </h3>
                <button
                  onClick={() => removeProject(project.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FolderOpen className="inline h-4 w-4 mr-1" />
                    Project Name *
                  </label>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => updateProjectField(project.id, 'name', e.target.value)}
                    className="form-input"
                    placeholder="E-commerce Platform"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Start Date
                  </label>
                  <input
                    type="month"
                    value={project.startDate}
                    onChange={(e) => updateProjectField(project.id, 'startDate', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="month"
                    value={project.endDate}
                    onChange={(e) => updateProjectField(project.id, 'endDate', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <ExternalLink className="inline h-4 w-4 mr-1" />
                    Live URL
                  </label>
                  <input
                    type="url"
                    value={project.url}
                    onChange={(e) => updateProjectField(project.id, 'url', e.target.value)}
                    className="form-input"
                    placeholder="https://project-demo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Github className="inline h-4 w-4 mr-1" />
                    GitHub Repository
                  </label>
                  <input
                    type="url"
                    value={project.github}
                    onChange={(e) => updateProjectField(project.id, 'github', e.target.value)}
                    className="form-input"
                    placeholder="https://github.com/username/project"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Technologies Used
                  </label>
                  <input
                    type="text"
                    value={project.technologies}
                    onChange={(e) => updateProjectField(project.id, 'technologies', e.target.value)}
                    className="form-input"
                    placeholder="React, Node.js, MongoDB, AWS"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    List the main technologies, frameworks, and tools used
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description
                  </label>
                  <textarea
                    value={project.description}
                    onChange={(e) => updateProjectField(project.id, 'description', e.target.value)}
                    className="form-textarea"
                    rows="4"
                    placeholder="Describe the project, your role, key features, and impact..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Focus on the problem solved, your contributions, and measurable outcomes
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectsStep;