"use client"

import { useState } from "react"
import { generateResponse } from "./actions"
import { Heading, Flex, Text, Center } from "@chakra-ui/react"
import { EmojiStyle } from "emoji-picker-react"
import Picker from "@/components/Picker"
import Input from "@/components/Input"
import Chips from "@/components/Chips"
import { ResponseType } from "@/types"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export default function Home() {
  const [input, setInput] = useState("")
  const [generatedResponses, setGeneratedResponses] = useState<ResponseType[]>(
    []
  )
  const [count, setCount] = useState(10)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setInput("")

    const result = await generateResponse({
      question: input,
      emoji: "🐶",
    })

    setGeneratedResponses([...generatedResponses, result])
    setCount(count - 1)
  }

  return (
    <Flex
      direction="column"
      w="full"
      maxW="md"
      padding={4}
      mx="auto"
      align="stretch"
    >
      <Center
        bg="gray.100"
        p={4}
        borderRadius="md"
        height={100}
        width={100}
        alignSelf="center"
      >
        <Heading>?</Heading>
      </Center>

      <Chips generatedResponses={generatedResponses} />

      {generatedResponses.map((answer, index) => (
        <Text key={index}>{answer.response}</Text>
      ))}

      <Input
        inputValue={input}
        setInputValue={setInput}
        handleSubmit={handleSubmit}
      />

      <Picker
        emojiStyle={EmojiStyle.NATIVE}
        width="100%"
        // height={600}
        onEmojiClick={() => console.log("clicked a thingy")}
        skinTonesDisabled
        autoFocusSearch={false}
      />
    </Flex>
  )
}
