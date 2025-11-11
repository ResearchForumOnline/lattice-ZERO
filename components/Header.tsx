
import React from 'react';
import { ResetIcon, LatticeIcon } from './IconComponents';

interface HeaderProps {
    onReset?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
    return (
        <header className="w-full max-w-5xl mb-8 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <LatticeIcon className="w-8 h-8 text-brand-primary" />
                <h1 className="text-2xl sm:text-3xl font-bold text-brand-text">Project Lattice</h1>
            </div>
            {onReset && (
                 <button 
                    onClick={onReset} 
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-subtle bg-brand-surface border border-brand-subtle/20 rounded-md hover:bg-brand-subtle/20 hover:text-brand-text transition-colors"
                    aria-label="Start Over"
                >
                    <ResetIcon className="w-4 h-4" />
                    <span>Reset</span>
                </button>
            )}
        </header>
    );
};
