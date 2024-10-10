"use client"

import { useState } from "react"
import { generateResponse } from "./actions"
import { Heading, Flex, Text, Center, Button } from "@chakra-ui/react"
import { EmojiStyle } from "emoji-picker-react"
import { Picker, Input, Chips } from "@/components"
import { ResponseType } from "@/types"

export const EMOJI_OF_THE_DAY = "◻️"

export default function Home() {
  const [input, setInput] = useState("")
  const [generatedResponses, setGeneratedResponses] = useState<ResponseType[]>(
    []
  )
  const [count, setCount] = useState(10)
  const [emojiGuess, setEmojiGuess] = useState("")
  const [isAnswering, setIsAnswering] = useState(false)
  const [showPicker, setShowPicker] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setInput("")
    setIsAnswering(true)

    const result = await generateResponse({
      question: input,
      emoji: EMOJI_OF_THE_DAY,
    })

    setGeneratedResponses([...generatedResponses, result])
    setCount(count - 1)
    setIsAnswering(false)
    console.log("count", count)
  }

  const handleConfirm = async () => {
    if (emojiGuess !== EMOJI_OF_THE_DAY) {
      setGeneratedResponses([
        ...generatedResponses,
        { answer: false, response: `The emoji is not ${emojiGuess}` },
      ])
      setCount(count - 1)
    }

    if (emojiGuess === EMOJI_OF_THE_DAY) {
      setGeneratedResponses([
        ...generatedResponses,
        { answer: true, response: `The emoji is ${emojiGuess}` },
      ])
      setCount(count - 1)
    }
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
        <Heading>{emojiGuess ? emojiGuess : "?"}</Heading>
      </Center>
      {emojiGuess && (
        <>
          <Button onClick={handleConfirm}>Confirm</Button>
          <Button onClick={() => setEmojiGuess("")}>Clear</Button>
        </>
      )}

      <Chips generatedResponses={generatedResponses} />

      {generatedResponses.map((answer, index) => (
        <Text key={index}>{answer.response}</Text>
      ))}

      <Input
        inputValue={input}
        setInputValue={setInput}
        handleSubmit={handleSubmit}
        isAnswering={isAnswering}
      />

      <Button onClick={() => setShowPicker(!showPicker)}>
        {showPicker ? "Hide Picker" : "Show Picker"}
      </Button>
      {showPicker && (
        <Picker
          emojiStyle={EmojiStyle.NATIVE}
          width="100%"
          onEmojiClick={(emoji) => setEmojiGuess(emoji.emoji)}
          skinTonesDisabled
          autoFocusSearch={false}
        />
      )}
    </Flex>
  )
}
