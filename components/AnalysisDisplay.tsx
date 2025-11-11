
import React from 'react';
import type { GoalAnalysis } from '../types';
import { PlusCircleIcon, MinusCircleIcon, TrendingDownIcon, SparklesIcon } from './IconComponents';

interface AnalysisDisplayProps {
  goal: string;
  analysis: GoalAnalysis;
  onGenerate: () => void;
  error?: string | null;
}

const AnalysisCard: React.FC<{ title: string; items: string[]; icon: React.ReactNode }> = ({ title, items, icon }) => (
    <div className="bg-brand-surface p-6 rounded-lg border border-brand-subtle/20 flex-1 min-w-[280px]">
        <div className="flex items-center gap-3 mb-4">
            {icon}
            <h3 className="text-xl font-bold text-brand-primary">{title}</h3>
        </div>
        <ul className="space-y-3 list-inside">
            {items.map((item, index) => (
                <li key={index} className="text-brand-text text-sm leading-relaxed flex items-start">
                    <span className="text-brand-primary mr-2 mt-1">&#8227;</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ goal, analysis, onGenerate, error }) => {
  return (
    <div className="w-full animate-fade-in">
        <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-text">Problem DNA</h2>
            <p className="text-brand-subtle mt-2 max-w-3xl mx-auto">
                QKE analysis complete. Here is the multi-dimensional map for your goal: <span className="text-brand-text font-semibold">"{goal}"</span>
            </p>
        </div>
      <div className="flex flex-wrap gap-6 justify-center mb-8">
        <AnalysisCard title="Positive Shifts" items={analysis.positiveShifts} icon={<PlusCircleIcon className="w-6 h-6 text-green-400" />} />
        <AnalysisCard title="Negative Shifts" items={analysis.negativeShifts} icon={<MinusCircleIcon className="w-6 h-6 text-red-400" />} />
        <AnalysisCard title="Decay Factors" items={analysis.decayFactors} icon={<TrendingDownIcon className="w-6 h-6 text-yellow-400" />} />
      </div>
      <div className="text-center mt-10">
        <button
          onClick={onGenerate}
          className="bg-brand-primary text-brand-bg font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-transform hover:scale-105 flex items-center gap-2 mx-auto"
        >
          <SparklesIcon className="w-5 h-5" />
          Generate Actionable Strategies
        </button>
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};
