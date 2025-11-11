
import React, { useState } from 'react';
import { ArrowRightIcon } from './IconComponents';

interface GoalInputProps {
  onSubmit: (goal: string) => void;
  error?: string | null;
}

export const GoalInput: React.FC<GoalInputProps> = ({ onSubmit, error }) => {
  const [goal, setGoal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal.trim()) {
      onSubmit(goal.trim());
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 animate-fade-in">
        <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-text">Define Your Goal</h2>
            <p className="text-brand-subtle mt-2 max-w-2xl mx-auto">
                Enter a complex goal, challenge, or problem. Project Lattice will deconstruct it into a multi-dimensional map of risks and opportunities.
            </p>
        </div>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <div className="relative">
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., Build a successful dropshipping business from scratch..."
            className="w-full p-4 pr-28 bg-brand-surface border border-brand-subtle/20 rounded-lg resize-none focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow"
            rows={4}
          />
          <button
            type="submit"
            disabled={!goal.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-brand-primary text-brand-bg font-bold p-2 rounded-full hover:bg-opacity-90 disabled:bg-brand-subtle/50 disabled:cursor-not-allowed transition-all"
            aria-label="Submit Goal"
          >
            <ArrowRightIcon className="w-6 h-6" />
          </button>
        </div>
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
};
