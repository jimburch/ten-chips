"use client"

import { useState } from "react"
import { Button, Flex, Input } from "@chakra-ui/react"
import type { Emojis } from "@/utils/emojis"
import { searchEmojis } from "@/utils/search"
import EmojiButton from "@/components/buttons/EmojiButton"
export default function Emojis({ emojis }: { emojis: Emojis }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("smileys")
  const [searchedEmojis, setSearchedEmojis] = useState<object[]>([])
  const [search, setSearch] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)

    if (!e.target.value) {
      setSearchedEmojis([])
      return
    }

    const searchString = e.target.value
    setSearchedEmojis(searchEmojis(searchString, emojis))
  }

  const renderSearchedEmojis = () => {
    return searchedEmojis
      .slice(0, 50)
      .map((emojiObject) => (
        <EmojiButton
          key={Object.keys(emojiObject)[0]}
          emoji={Object.values(emojiObject)[0]}
          onClick={() => {}}
        />
      ))
  }

  const renderEmojiCategories = () => {
    return Object.entries(emojis[selectedCategory as keyof typeof Emojis]).map(
      ([emojiLabel, emoji]) => (
        <EmojiButton
          key={emojiLabel}
          emoji={emoji as string}
          onClick={() => {}}
        />
      )
    )
  }

  return (
    <Flex direction="column">
      <Input placeholder="Search" value={search} onChange={handleChange} />
      <Flex gap={1} wrap="wrap">
        {Object.keys(emojis).map((categoryName) => (
          <Button
            key={categoryName}
            variant={selectedCategory === categoryName ? "solid" : "outline"}
            size="xs"
            onClick={() => setSelectedCategory(categoryName)}
            disabled={!!search}
          >
            {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
          </Button>
        ))}
      </Flex>
      <Flex gap={2} wrap="wrap">
        {searchedEmojis && renderSearchedEmojis()}
        {!search && renderEmojiCategories()}
      </Flex>
    </Flex>
  )
}
