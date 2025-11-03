
import { GoogleGenAI, Type } from "@google/genai";
import { Insight } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: 'A concise summary of the note in one or two sentences.',
    },
    topics: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: 'An array of 2-4 main topics or keywords from the note.',
    },
    category: {
      type: Type.STRING,
      description: 'A single, relevant category for the note (e.g., "Work", "Personal", "Learning", "Idea").',
    },
  },
  required: ['summary', 'topics', 'category'],
};

export const getNoteInsights = async (noteContent: string): Promise<Insight> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following note and provide insights. Note: "${noteContent}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    
    // Basic validation to ensure the response matches the expected structure
    if (parsedJson && typeof parsedJson.summary === 'string' && Array.isArray(parsedJson.topics) && typeof parsedJson.category === 'string') {
        return parsedJson as Insight;
    } else {
        throw new Error("Invalid JSON structure received from API");
    }
  } catch (error) {
    console.error("Error fetching insights from Gemini API:", error);
    throw new Error("Could not retrieve insights. The API may be unavailable or the response was malformed.");
  }
};
