import React, { useState } from 'react';
import StepNavigation from './StepNavigation';
import PersonalInfoStep from './steps/PersonalInfoStep';
import ExperienceStep from './steps/ExperienceStep';
import EducationStep from './steps/EducationStep';
import SkillsStep from './steps/SkillsStep';
import ProjectsStep from './steps/ProjectsStep';
import AchievementsStep from './steps/AchievementsStep';
import ResumePreview from './ResumePreview';
import PDFGenerator from './PDFGenerator';
import { FileText, Download, Eye } from 'lucide-react';

const steps = [
  { id: 1, name: 'Personal Info', component: PersonalInfoStep },
  { id: 2, name: 'Experience', component: ExperienceStep },
  { id: 3, name: 'Education', component: EducationStep },
  { id: 4, name: 'Skills', component: SkillsStep },
  { id: 5, name: 'Projects', component: ProjectsStep },
  { id: 6, name: 'Achievements', component: AchievementsStep }
];

function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId) => {
    setCurrentStep(stepId);
  };

  const CurrentStepComponent = steps.find(step => step.id === currentStep)?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">AI Resume Builder</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Eye className="h-4 w-4" />
                <span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
              </button>
              <PDFGenerator>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </button>
              </PDFGenerator>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className={`${showPreview ? 'lg:w-1/2' : 'lg:w-2/3 mx-auto'} transition-all duration-300`}>
            

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Step Navigation */}
              <div className="border-b bg-gray-50 p-6">
                <StepNavigation
                  steps={steps}
                  currentStep={currentStep}
                  onStepClick={handleStepClick}
                />
              </div>

              {/* Step Content */}
              <div className="p-6">
                <div className="fade-in">
                  {CurrentStepComponent && <CurrentStepComponent />}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                      currentStep === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNextStep}
                    disabled={currentStep === steps.length}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                      currentStep === steps.length
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'btn-primary'
                    }`}
                  >
                    {currentStep === steps.length ? 'Complete' : 'Next'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="lg:w-1/2">
              <div className="sticky top-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Resume Preview</h2>
                  <div className="border rounded-lg overflow-hidden" style={{ height: '800px' }}>
                    <ResumePreview />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;