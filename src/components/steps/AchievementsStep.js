import React, { useState } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { Plus, Trash2, Trophy, Star, Award } from 'lucide-react';

const achievementTypes = [
  { id: 'award', name: 'Awards & Honors', icon: Award, color: 'yellow' },
  { id: 'certification', name: 'Certifications', icon: Star, color: 'blue' },
  { id: 'achievement', name: 'Other Achievements', icon: Trophy, color: 'green' }
];

function AchievementsStep() {
  const { resumeData, updateAchievements } = useResume();
  const [achievements, setAchievements] = useState(resumeData.achievements || []);

  const addAchievement = () => {
    const newAchievement = {
      id: Date.now(),
      title: '',
      organization: '',
      date: '',
      description: '',
      type: 'achievement'
    };
    const updatedAchievements = [...achievements, newAchievement];
    setAchievements(updatedAchievements);
    updateAchievements(updatedAchievements);
  };

  const removeAchievement = (id) => {
    const updatedAchievements = achievements.filter(ach => ach.id !== id);
    setAchievements(updatedAchievements);
    updateAchievements(updatedAchievements);
  };

  const updateAchievementField = (id, field, value) => {
    const updatedAchievements = achievements.map(ach =>
      ach.id === id ? { ...ach, [field]: value } : ach
    );
    setAchievements(updatedAchievements);
    updateAchievements(updatedAchievements);
  };

  const getAchievementsByType = (type) => {
    return achievements.filter(ach => ach.type === type);
  };

  return (
    <div className="space-y-6 slide-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Achievements & Awards</h2>
          <p className="text-gray-600">Highlight your accomplishments and recognitions</p>
        </div>
        <button
          onClick={addAchievement}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      {achievements.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No achievements added yet</p>
          <button
            onClick={addAchievement}
            className="btn-secondary mt-4"
          >
            Add Your First Achievement
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {achievements.map((achievement, index) => (
            <div key={achievement.id} className="card border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Achievement {index + 1}
                </h3>
                <button
                  onClick={() => removeAchievement(achievement.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={achievement.title}
                    onChange={(e) => updateAchievementField(achievement.id, 'title', e.target.value)}
                    className="form-input"
                    placeholder="Employee of the Year"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization/Issuer
                  </label>
                  <input
                    type="text"
                    value={achievement.organization}
                    onChange={(e) => updateAchievementField(achievement.id, 'organization', e.target.value)}
                    className="form-input"
                    placeholder="Company Name / Certifying Body"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Received
                  </label>
                  <input
                    type="month"
                    value={achievement.date}
                    onChange={(e) => updateAchievementField(achievement.id, 'date', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={achievement.type}
                    onChange={(e) => updateAchievementField(achievement.id, 'type', e.target.value)}
                    className="form-input"
                  >
                    {achievementTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={achievement.description}
                    onChange={(e) => updateAchievementField(achievement.id, 'description', e.target.value)}
                    className="form-textarea"
                    rows="3"
                    placeholder="Brief description of the achievement and its significance..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Achievement Summary by Type */}
      {achievements.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievement Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievementTypes.map(type => {
              const typeAchievements = getAchievementsByType(type.id);
              const IconComponent = type.icon;
              
              return (
                <div key={type.id} className="bg-white rounded-lg p-4 border">
                  <div className="flex items-center space-x-2 mb-2">
                    <IconComponent className={`h-5 w-5 text-${type.color}-600`} />
                    <span className="font-medium text-gray-900">{type.name}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-700">
                    {typeAchievements.length}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default AchievementsStep;