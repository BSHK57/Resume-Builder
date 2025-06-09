import React from 'react';
import ResumeBuilder from './components/ResumeBuilder';
import { ResumeProvider } from './contexts/ResumeContext';

function App() {
  return (
    <ResumeProvider>
      <div className="min-h-screen bg-gray-50">
        <ResumeBuilder />
      </div>
    </ResumeProvider>
  );
}

export default App;