
import React, { useState } from 'react';
import { LockIcon } from './IconComponents';

interface ApiKeyModalProps {
  onSubmit: (apiKey: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSubmit }) => {
  const [key, setKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(key);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-brand-surface rounded-lg shadow-2xl w-full max-w-md p-6 sm:p-8 border border-brand-subtle/20">
        <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-brand-primary/10">
                <LockIcon className="h-6 w-6 text-brand-primary" />
            </div>
          <h2 className="text-2xl font-bold text-brand-text mt-4">Enter Your Gemini API Key</h2>
          <p className="text-brand-subtle mt-2 text-sm">
            Project Lattice processes all data locally in your browser. Your key is stored in local storage and is never sent to our servers.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Paste your API key here"
            className="w-full px-4 py-3 bg-brand-bg border border-brand-subtle/30 rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow"
          />
          <button
            type="submit"
            disabled={!key}
            className="w-full mt-4 bg-brand-primary text-brand-bg font-bold py-3 px-4 rounded-md hover:bg-opacity-90 disabled:bg-brand-subtle/50 disabled:cursor-not-allowed transition-colors"
          >
            Activate Node
          </button>
           <div className="text-center mt-4">
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-primary hover:underline">
                  Get your Gemini API key from Google AI Studio
              </a>
          </div>
        </form>
      </div>
    </div>
  );
};
