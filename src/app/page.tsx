"use client"

import { useState } from "react"
import { generateResponse } from "./actions"
import { Heading, Flex, Text, Center, Button } from "@chakra-ui/react"
import { EmojiStyle } from "emoji-picker-react"
import { Picker, Input, Chips } from "@/components"
import { ResponseType } from "@/types"
import Confetti from "react-confetti"

const EMOJI_OPTIONS = [
  "🏀", // Sports
  "🍕", // Food
  "🐘", // Animals
  "🚀", // Travel & Places
  "🎸", // Activities
  "🌈", // Nature
  "🤖", // Smileys & People
  "💡", // Objects
  "🏆", // Awards
  "🎭", // Arts & Entertainment
  "🧬", // Science
  "🌋", // Geography
  "🎨", // Art Supplies
  "📚", // Books
  "🧩", // Games
  "🎉", // Celebration
  "🔮", // Magic
  "🦄", // Mythical Creatures
  "🌺", // Flowers
  "🧠", // Body Parts
]
export const EMOJI_OF_THE_DAY =
  EMOJI_OPTIONS[Math.floor(Math.random() * EMOJI_OPTIONS.length)]

export default function Home() {
  const [input, setInput] = useState("")
  const [generatedResponses, setGeneratedResponses] = useState<ResponseType[]>(
    []
  )
  const [count, setCount] = useState(10)
  const [emojiGuess, setEmojiGuess] = useState("")
  const [isAnswering, setIsAnswering] = useState(false)
  const [showPicker, setShowPicker] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
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

    if (count <= 1) setShowPicker(true)

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
      setIsCorrect(true)
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
      gap={4}
    >
      <Center
        bg={isCorrect ? "green.100" : "gray.100"}
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

      <Flex direction="column" justify="center">
        {generatedResponses.map((answer, index) => (
          <Text key={index}>{answer.response}</Text>
        ))}
      </Flex>

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
      {isCorrect && <Confetti />}
    </Flex>
  )
}
