
import React from 'react';
import { LatticeIcon } from './IconComponents';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center animate-fade-in">
      <LatticeIcon className="w-16 h-16 text-brand-primary animate-spin-slow" />
      {message && <p className="text-brand-subtle mt-4 text-lg">{message}</p>}
    </div>
  );
};

// Add custom animation to tailwind.config if it were a file. Since it's in a script tag, we add a style tag in index.html, but this is a better practice.
// In a real project, this would go in your CSS or tailwind config.
const styles = `
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slide-up {
  animation: slide-up 0.6s ease-out forwards;
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
