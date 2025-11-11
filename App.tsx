
import React, { useState, useEffect, useCallback } from 'react';
import { ApiKeyModal } from './components/ApiKeyModal';
import { Header } from './components/Header';
import { GoalInput } from './components/GoalInput';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { StrategyDisplay } from './components/StrategyDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { analyzeGoal, generateStrategies, validateEthicality } from './services/geminiService';
import type { GoalAnalysis, Strategy } from './types';
import { AppState } from './types';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [appState, setAppState] = useState<AppState>(AppState.API_KEY);
  const [goal, setGoal] = useState<string>('');
  const [analysis, setAnalysis] = useState<GoalAnalysis | null>(null);
  const [strategies, setStrategies] = useState<Strategy[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedApiKey = localStorage.getItem('geminiApiKey');
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setAppState(AppState.INPUT_GOAL);
    } else {
      setAppState(AppState.API_KEY);
    }
    setIsLoading(false);
  }, []);

  const handleApiKeySubmit = useCallback((key: string) => {
    if (key) {
      setApiKey(key);
      localStorage.setItem('geminiApiKey', key);
      setAppState(AppState.INPUT_GOAL);
      setError(null);
    }
  }, []);

  const handleReset = useCallback(() => {
    setGoal('');
    setAnalysis(null);
    setStrategies(null);
    setError(null);
    setAppState(AppState.INPUT_GOAL);
  }, []);

  const handleGoalSubmit = useCallback(async (submittedGoal: string) => {
    if (!apiKey) {
      setError("API Key is not set.");
      setAppState(AppState.API_KEY);
      return;
    }
    setError(null);
    setGoal(submittedGoal);
    setIsLoading(true);
    setLoadingMessage('Deconstructing Goal with QKE Analysis...');
    setAppState(AppState.LOADING);

    try {
      const analysisResult = await analyzeGoal(submittedGoal, apiKey);
      setAnalysis(analysisResult);
      setAppState(AppState.SHOW_ANALYSIS);
    } catch (e) {
      setError((e as Error).message);
      setAppState(AppState.INPUT_GOAL);
    } finally {
      setIsLoading(false);
    }
  }, [apiKey]);

  const handleGenerateStrategies = useCallback(async () => {
    if (!apiKey || !analysis || !goal) {
      setError("Missing required data to generate strategies.");
      setAppState(AppState.INPUT_GOAL);
      return;
    }
    setError(null);
    setIsLoading(true);
    setLoadingMessage('Optimizing Strategies with Cognitive Framework...');
    setAppState(AppState.LOADING);

    try {
      const generatedStrategies = await generateStrategies(goal, analysis, apiKey);
      
      setLoadingMessage('Validating Ethical Resonance...');
      const strategiesWithScores = await validateEthicality(generatedStrategies, apiKey);
      
      setStrategies(strategiesWithScores);
      setAppState(AppState.SHOW_STRATEGIES);
    } catch (e) {
      setError((e as Error).message);
      setAppState(AppState.SHOW_ANALYSIS); 
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, analysis, goal]);
  
  const renderContent = () => {
    if (isLoading && appState !== AppState.API_KEY) {
      return <LoadingSpinner message={loadingMessage} />;
    }
    
    switch (appState) {
      case AppState.INPUT_GOAL:
        return <GoalInput onSubmit={handleGoalSubmit} error={error} />;
      case AppState.LOADING:
        return <LoadingSpinner message={loadingMessage} />;
      case AppState.SHOW_ANALYSIS:
        return analysis && <AnalysisDisplay goal={goal} analysis={analysis} onGenerate={handleGenerateStrategies} error={error} />;
      case AppState.SHOW_STRATEGIES:
        return strategies && <StrategyDisplay goal={goal} strategies={strategies} onReset={handleReset} />;
      default:
        return <GoalInput onSubmit={handleGoalSubmit} error={error} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
      {appState === AppState.API_KEY && <ApiKeyModal onSubmit={handleApiKeySubmit} />}
      <Header onReset={appState !== AppState.INPUT_GOAL && appState !== AppState.API_KEY ? handleReset : undefined} />
      <main className="w-full max-w-5xl flex-grow">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
