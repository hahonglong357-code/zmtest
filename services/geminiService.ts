
import { GoogleGenAI } from "@google/genai";
import { GameState } from "../types";

export async function getGameHint(state: GameState) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const gridSummary = state.grid.map((col, idx) => {
    return `Col ${idx}: [${col.map(c => c.value).join(', ')}]`;
  }).join('\n');

  const prompt = `
    You are a math puzzle expert. 
    Current Target: ${state.currentTarget}
    Grid Layout:
    ${gridSummary}

    The rules: 
    1. Select a number from Col 0 or Col 2.
    2. Select an operator from Col 1.
    3. Select a target number from Col 0 or Col 2 (different from the first).
    4. The second number becomes (First Num Operator Second Num).
    5. Goal is to create ${state.currentTarget}.

    Give me a very short, encouraging hint in 1 sentence. Do not reveal the exact answer if too obvious, just point to a possible combination.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Keep trying! Look for numbers that can reach the target.";
  }
}
