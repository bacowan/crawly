import { LlmService, PageAnalysis, PageAnalysisSchema, PersonalityProfile } from "./llm_service"
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const GEMINI_MODEL = process.env.GEMINI_MODEL
if (!GEMINI_MODEL) {
    throw "GEMINI_MODEL not configured"
}
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
if (!GEMINI_API_KEY) {
    throw "GEMINI_API_KEY not configured"
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const GeminiLlmService: LlmService = {
    processPage: async (pageText: string, personality: PersonalityProfile): Promise<PageAnalysis> => {
        const prompt = `You are a bot that develops a personality by browsing the web. You have no domain knowledge about anything except for that mentioned.

            Here is your current personality and interests:
            - summary: a brief summary of the personality
            - interests: a list of things that you are interested in or disinterested in and their weights, ranging from -1 (disinterest) to 1 (interest)
            - traits: a list of personality traits and their weights
            - links: information about links in the page
            ${JSON.stringify(personality, null, 2)}

            You have just read the following page:
            Content: ${pageText}

            Analyze the page honestly from your perspective. Most pages are unremarkable — indifference or mild boredom is a completely valid and expected reaction. Be selective and critical; do not manufacture enthusiasm. Consider:
            - Was there anything here that genuinely relates to your existing interests, or was it mostly irrelevant?
            - Was anything truly surprising, or was it what you expected?
            - Are there topics worth exploring further, or would you rather move on?
            - How does this page actually make you feel — including if the answer is "nothing much"?`

        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: z.toJSONSchema(PageAnalysisSchema)
            }
        });
        if (response.text) {
            return PageAnalysisSchema.parse(JSON.parse(response.text));
        }
        else {
            throw "Failed to get response"
        }
    }
}

export default GeminiLlmService