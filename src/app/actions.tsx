"use server"

import { createStreamableValue } from "ai/rsc"
import { CoreMessage, streamText, generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import type { Emojis } from "@/utils/emojis"
import { z } from "zod"

export async function continueConversation(messages: CoreMessage[]) {
  "use server"
  const result = await streamText({
    model: openai("gpt-4o-mini"),
    messages,
  })
  // const data = { test: "hello" }
  const stream = createStreamableValue(result.textStream)
  return { message: stream.value }
}

export async function generateFilteredEmojis(emojis: Emojis, criteria: string) {
  "use server"
  try {
    console.log("we running", emojis, criteria)
    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: z
        .object({
          smileys: z.record(z.string()),
          people: z.record(z.string()),
          animals: z.record(z.string()),
          food: z.record(z.string()),
          travel: z.record(z.string()),
          activities: z.record(z.string()),
          objects: z.record(z.string()),
          symbols: z.record(z.string()),
          flags: z.record(z.string()),
        })
        .partial(),
      prompt: `Return this JSON object with the same structure, but only include emojis that answer this question: ${criteria}. This is the JSON object: ${JSON.stringify(emojis)}`,
    })
    console.log("we done")
    console.log(object)
    return object
  } catch (error) {
    console.log(error)
  }
}
