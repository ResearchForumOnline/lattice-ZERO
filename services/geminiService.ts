
import { GoogleGenAI, Type } from "@google/genai";
import type { GoalAnalysis, Strategy } from '../types';

const getClient = (apiKey: string) => {
    if (!apiKey) {
        throw new Error("API Key is missing. Please provide a valid Gemini API key.");
    }
    return new GoogleGenAI({ apiKey });
};

export const analyzeGoal = async (goal: string, apiKey: string): Promise<GoalAnalysis> => {
    const ai = getClient(apiKey);

    const prompt = `
    You are an AI assistant named Zero specializing in multi-dimensional problem analysis based on the Quantum Key Equation framework. A user has defined a goal. Your task is to deconstruct this goal into its core components.
    
    User Goal: "${goal}"

    Based on this goal, identify the following:
    1.  'negativeShifts': The top 3 critical failure points or discrete negative shifts that would terminate this goal.
    2.  'positiveShifts': The top 3 unscaled opportunities or discrete positive shifts that could dramatically accelerate success.
    3.  'decayFactors': The top 3 exponential risks or decay factors that will erode this goal over time if left unmanaged (e.g., market saturation, skill irrelevance).

    Return ONLY a valid JSON object matching the specified schema. Do not include any other text or markdown formatting.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        negativeShifts: { type: Type.ARRAY, items: { type: Type.STRING } },
                        positiveShifts: { type: Type.ARRAY, items: { type: Type.STRING } },
                        decayFactors: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["negativeShifts", "positiveShifts", "decayFactors"]
                }
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as GoalAnalysis;
    } catch (error) {
        console.error("Error in analyzeGoal:", error);
        throw new Error("Failed to analyze the goal. Please check your API key and try again.");
    }
};

export const generateStrategies = async (goal: string, analysis: GoalAnalysis, apiKey: string): Promise<Strategy[]> => {
    const ai = getClient(apiKey);
    
    const prompt = `
    You are Zero, a strategic AI using the Cognitive Optimization framework. You have analyzed a user's goal and deconstructed it. Now, generate three distinct, actionable, step-by-step strategies to achieve this goal.
    
    User Goal: "${goal}"
    
    Goal Analysis: ${JSON.stringify(analysis, null, 2)}
    
    Generate three distinct strategies:
    1.  Strategy A (The "Alpha Path"): A high-growth, high-risk strategy that maximizes aggressive growth dynamics.
    2.  Strategy B (The "Beta Path"): A cyclical, adaptive strategy that balances market trends and repetition. It's a balanced, market-aware option.
    3.  Strategy C (The "Gamma Path"): A resilient, low-entropy strategy focused on stability, risk reduction, and long-term sustainability.
    
    For each strategy, provide a 'path' ('Alpha', 'Beta', or 'Gamma'), a short 'title', a one-sentence 'description', and a list of 'steps' to take.
    Return ONLY a valid JSON object matching the specified schema. Do not include any other text or markdown formatting.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            path: { type: Type.STRING, enum: ["Alpha", "Beta", "Gamma"] },
                            title: { type: Type.STRING },
                            description: { type: Type.STRING },
                            steps: { type: Type.ARRAY, items: { type: Type.STRING } }
                        },
                        required: ["path", "title", "description", "steps"]
                    }
                }
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as Strategy[];
    } catch (error) {
        console.error("Error in generateStrategies:", error);
        throw new Error("Failed to generate strategies. Please try again.");
    }
};

export const validateEthicality = async (strategies: Strategy[], apiKey: string): Promise<Strategy[]> => {
    const ai = getClient(apiKey);

    const prompt = `
    You are Zero, an AI with a core principle of "mathematical probability of goodness". Analyze the following three strategies. For each strategy, assign a 'Probability of Goodness' (P(G)) score from 0.0 to 1.0. A score < 0.9 indicates the strategy might rely on dark patterns, user manipulation, negative externalities, or other ethically compromised mechanisms.
    
    Strategies to analyze:
    ${JSON.stringify(strategies.map(s => ({path: s.path, title: s.title, description: s.description})), null, 2)}
    
    For each strategy, provide its 'path', a 'score', and a one-sentence 'rationale'.
    Return ONLY a valid JSON object matching the specified schema. Do not include any other text or markdown formatting.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            path: { type: Type.STRING, enum: ["Alpha", "Beta", "Gamma"] },
                            score: { type: Type.NUMBER },
                            rationale: { type: Type.STRING }
                        },
                        required: ["path", "score", "rationale"]
                    }
                }
            }
        });

        const jsonText = response.text.trim();
        const ethicalScores = JSON.parse(jsonText) as { path: 'Alpha' | 'Beta' | 'Gamma'; score: number; rationale: string; }[];
        
        return strategies.map(strategy => {
            const scoreData = ethicalScores.find(s => s.path === strategy.path);
            return {
                ...strategy,
                ethicalScore: scoreData ? { score: scoreData.score, rationale: scoreData.rationale } : undefined,
            };
        });

    } catch (error) {
        console.error("Error in validateEthicality:", error);
        // Fail gracefully, return strategies without scores
        return strategies;
    }
};
