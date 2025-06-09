import React from 'react';
import { Check } from 'lucide-react';

function StepNavigation({ steps, currentStep, onStepClick }) {
  return (
    <div className="flex justify-between items-center">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;
        const isClickable = step.id <= currentStep;

        return (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <button
              onClick={() => isClickable && onStepClick(step.id)}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300
                ${isActive ? 'step-active scale-110' : ''}
                ${isCompleted ? 'step-completed' : ''}
                ${!isActive && !isCompleted ? 'step-inactive' : ''}
                ${isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'}
              `}
            >
              {isCompleted ? (
                <Check className="h-5 w-5" />
              ) : (
                <span>{step.id}</span>
              )}
            </button>

            {/* Step Label */}
            <div className="ml-3 hidden sm:block">
              <p className={`text-sm font-medium ${
                isActive ? 'text-blue-600' : 
                isCompleted ? 'text-green-600' : 
                'text-gray-500'
              }`}>
                {step.name}
              </p>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className={`
                hidden sm:block h-0.5 w-12 ml-4 transition-colors duration-300
                ${isCompleted ? 'bg-green-400' : 'bg-gray-200'}
              `} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StepNavigation;