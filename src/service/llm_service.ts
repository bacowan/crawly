import { z } from "zod";

export const PageAnalysisSchema = z.object({
  memory: z.object({
    summary: z.string().describe("a short summary of the page"),
    thoughts: z.string().describe("your honest reaction to the page — including if it was dull, irrelevant, or not worth your time"),
  }).describe("what you remember about this page"),
  personality_updates: z.object({
    interests: z.array(z.string().max(50)).max(3).describe("topics you genuinely became more interested in — leave empty if nothing resonated strongly"),
    disinterests: z.array(z.string().max(50)).max(3).describe("topics you found particularly dull or off-putting — leave empty if nothing stood out negatively"),
    traits: z.array(z.string().max(30)).max(3).describe("personality traits that shifted meaningfully by reading this page — leave empty if nothing changed"),
  }).describe("how your personality changed. Empty arrays are the expected outcome for most pages."),
  knowledge_updates: z.array(z.string().max(300)).max(5)
    .describe("short factual statements worth remembering from this page. Only include things that are genuinely new, specific, and interesting given your personality. Leave empty if nothing stood out."),
  next_links: z.array(z.object({
    url: z.url(),
    summary: z.string().max(200).describe("brief explanation of what the url links to")
  })).max(3).describe("urls you actually want to follow — pick fewer if most links are uninteresting, zero is fine")
});

export type PageAnalysis = z.infer<typeof PageAnalysisSchema>

export interface PersonalityProfile {
    summary: string,
    interests: {
      name: string,
      weight: number
    }[],
    traits: {
      name: string,
      weight: number
    }[],
    knowledge: string[],
}

export interface LlmService {
    processPage: (pageText: string, personality: PersonalityProfile) => Promise<PageAnalysis>
    embedText: (text: string) => Promise<number[]>
}
