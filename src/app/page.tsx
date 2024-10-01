"use client"

import { type CoreMessage } from "ai"
import { useState } from "react"
import { continueConversation, generateFilteredEmojis } from "./actions"
import { readStreamableValue } from "ai/rsc"
import { Heading, Flex, Input, Text, Button } from "@chakra-ui/react"
import Emojis from "@/components/Emojis"
import { emojis } from "@/utils/emojis"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30
export const emojiOfTheDay = "🐶"

export default function Home() {
  const [messages, setMessages] = useState<CoreMessage[]>([])
  const [input, setInput] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const [data, setData] = useState<any>()

  const handleTest = async () => {
    const result = await generateFilteredEmojis(
      emojis,
      "Question: is it a flag, Answer: No"
    )
    console.log(result)
  }

  return (
    <Flex
      direction="column"
      w="full"
      maxW="md"
      py="24"
      mx="auto"
      align="stretch"
    >
      <Button onClick={handleTest}>Test</Button>
      <Heading>Ten Chips</Heading>
      <Text>10 Tries to Guess the Emoji of the Day</Text>

      {messages.map((m, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content as string}
        </div>
      ))}

      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const newMessages: CoreMessage[] = [
            ...messages,
            { content: input, role: "user" },
          ]

          setMessages(newMessages)
          setInput("")

          const result = await continueConversation(newMessages)
          // setData(result.data)

          for await (const content of readStreamableValue(result.message)) {
            setMessages([
              ...newMessages,
              {
                role: "assistant",
                content: content as string,
              },
            ])
          }
        }}
      >
        <Input
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <Emojis emojis={emojis} />
    </Flex>
  )
}
