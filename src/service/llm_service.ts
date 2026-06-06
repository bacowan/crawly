import { z } from "zod";

export const PageAnalysisSchema = z.object({
  memory: z.object({
    summary: z.string().describe("a short summary of the page"),
    thoughts: z.string().describe("your opinions of the content of the page"),
  }).describe("what you remember about this page"),
  personality_updates: z.object({
    interests: z.array(z.string().max(50)).max(3).describe("topics that you have become more interested in by reading this page, from most interesting to least interesting"),
    disinterests: z.array(z.string().max(50)).max(2).describe("topics that you found particularily disinteresting in this page, from most disinteresting to least disinteresting"),
    traits: z.array(z.string().max(30)).max(3).describe("personality traits that have changed by reading this page."),
    knowledge: z.array(z.object({
      topic: z.string().max(30).describe("Keep this general"),
      knowledge: z.string()
    }))
  }).describe("how your personality has changed by reading this page. Leave arrays empty if nothing has changed. Include existing values if relevant"),
  next_links: z.array(z.object({
    url: z.url(),
    summary: z.string().max(200).describe("brief explanation of what the url links to")
  })).max(3).describe("pick a maximum of 3 urls in the page that you would like to visit, ordered from most interested to least")
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
    knowledge: {
      topic: string,
      knowledge: string
    }[]
}

export interface LlmService {
    processPage: (pageText: string, personality: PersonalityProfile) => Promise<PageAnalysis>
}