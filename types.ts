
export interface GoalAnalysis {
  negativeShifts: string[];
  positiveShifts: string[];
  decayFactors: string[];
}

export interface Strategy {
  path: 'Alpha' | 'Beta' | 'Gamma';
  title: string;
  description: string;
  steps: string[];
  ethicalScore?: EthicalScore;
}

export interface EthicalScore {
  score: number;
  rationale: string;
}

export enum AppState {
  API_KEY,
  INPUT_GOAL,
  LOADING,
  SHOW_ANALYSIS,
  SHOW_STRATEGIES,
}
