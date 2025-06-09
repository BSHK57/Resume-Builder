import React, { useState } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { Plus, X, Code, Wrench, Users, Globe } from 'lucide-react';

const skillCategories = [
  { id: 'technical', name: 'Technical Skills', icon: Code, color: 'blue' },
  { id: 'tools', name: 'Tools & Software', icon: Wrench, color: 'green' },
  { id: 'soft', name: 'Soft Skills', icon: Users, color: 'purple' },
  { id: 'languages', name: 'Languages', icon: Globe, color: 'orange' }
];

function SkillsStep() {
  const { resumeData, updateSkills } = useResume();
  const [skills, setSkills] = useState(resumeData.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('technical');

  const addSkill = () => {
    if (newSkill.trim()) {
      const skill = {
        id: Date.now(),
        name: newSkill.trim(),
        category: selectedCategory
      };
      const updatedSkills = [...skills, skill];
      setSkills(updatedSkills);
      updateSkills(updatedSkills);
      setNewSkill('');
    }
  };

  const removeSkill = (id) => {
    const updatedSkills = skills.filter(skill => skill.id !== id);
    setSkills(updatedSkills);
    updateSkills(updatedSkills);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const getSkillsByCategory = (category) => {
    return skills.filter(skill => skill.category === category);
  };


  return (
    <div className="space-y-6 slide-in">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills</h2>
        <p className="text-gray-600">Add your professional skills and competencies</p>
      </div>

      {/* Add Skill Form */}
      <div className="card border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Skill</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill Name
            </label>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              className="form-input"
              placeholder="e.g., JavaScript, Project Management, Spanish"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-input"
            >
              {skillCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className={`mt-4 flex items-center space-x-2 ${
            newSkill.trim() ? 'btn-primary' : 'bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2 rounded-lg'
          }`}
        >
          <Plus className="h-4 w-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Skills Display */}
      <div className="space-y-6">
        {skillCategories.map(category => {
          const categorySkills = getSkillsByCategory(category.id);
          const IconComponent = category.icon;
          
          return (
            <div key={category.id} className="card border border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <IconComponent className={`h-5 w-5 text-${category.color}-600`} />
                <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
                  {categorySkills.length}
                </span>
              </div>

              {categorySkills.length === 0 ? (
                <p className="text-gray-500 text-sm italic">No skills added yet</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map(skill => (
                    <div
                      key={skill.id}
                      className={`
                        flex items-center space-x-2 px-3 py-1 rounded-full text-sm
                        bg-${category.color}-100 text-${category.color}-800 border border-${category.color}-200
                      `}
                    >
                      <span>{skill.name}</span>
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className={`text-${category.color}-600 hover:text-${category.color}-800 transition-colors`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {skills.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No skills added yet</p>
          <p className="text-gray-400 text-sm">Add your first skill using the form above</p>
        </div>
      )}
    </div>
  );
}

export default SkillsStep;