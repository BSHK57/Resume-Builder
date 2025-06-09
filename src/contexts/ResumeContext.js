import React, { createContext, useContext, useReducer } from 'react';

const ResumeContext = createContext();

const initialState = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  achievements: []
};

function resumeReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload }
      };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: action.payload
      };
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        experience: [...state.experience, action.payload]
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: action.payload
      };
    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [...state.education, action.payload]
      };
    case 'UPDATE_SKILLS':
      return {
        ...state,
        skills: action.payload
      };
    case 'UPDATE_PROJECTS':
      return {
        ...state,
        projects: action.payload
      };
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
    case 'UPDATE_ACHIEVEMENTS':
      return {
        ...state,
        achievements: action.payload
      };
    case 'RESET_RESUME':
      return initialState;
    default:
      return state;
  }
}

export const ResumeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  const updatePersonalInfo = (info) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: info });
  };

  const updateExperience = (experience) => {
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: experience });
  };

  const addExperience = (experience) => {
    dispatch({ type: 'ADD_EXPERIENCE', payload: experience });
  };

  const updateEducation = (education) => {
    dispatch({ type: 'UPDATE_EDUCATION', payload: education });
  };

  const addEducation = (education) => {
    dispatch({ type: 'ADD_EDUCATION', payload: education });
  };

  const updateSkills = (skills) => {
    dispatch({ type: 'UPDATE_SKILLS', payload: skills });
  };

  const updateProjects = (projects) => {
    dispatch({ type: 'UPDATE_PROJECTS', payload: projects });
  };

  const addProject = (project) => {
    dispatch({ type: 'ADD_PROJECT', payload: project });
  };

  const updateAchievements = (achievements) => {
    dispatch({ type: 'UPDATE_ACHIEVEMENTS', payload: achievements });
  };

  const resetResume = () => {
    dispatch({ type: 'RESET_RESUME' });
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData: state,
        updatePersonalInfo,
        updateExperience,
        addExperience,
        updateEducation,
        addEducation,
        updateSkills,
        updateProjects,
        addProject,
        updateAchievements,
        resetResume
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};