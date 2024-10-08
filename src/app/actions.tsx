"use server"

import { createStreamableValue } from "ai/rsc"
import { CoreMessage, streamText, generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { ResponseSchema, ResponseType } from "@/types"

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

interface GenerateResponseProps {
  question: string
  emoji: string
}

export async function generateResponse({
  question,
  emoji,
}: GenerateResponseProps): Promise<ResponseType> {
  "use server"
  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: ResponseSchema,
    prompt: `You are playing a game of 20 questions with the user. The answer is the emoji: ${emoji}. The user's question is: ${question}.

    Answer true or false in the "answer" field. And give a short text response that confirms or denies the user's answer in the "response" field, followed by an example emoji that matches the response.

    For example, "The emoji is not a flag 🇺🇸" or "The emoji is a face 🤪". Do not start the response with "yes" or "no". Always start with "The emoji is..." Do not provide any text after the one-sentence response. The example emoji must never be the answer as ${emoji}. The example emoji must not be a hint at the answer.

    If the question is too abstract, not a yes or no question, or is not a question related to the game, answer false and respond with "This is an invalid question. Try again!"`,
  })
  return object
}
