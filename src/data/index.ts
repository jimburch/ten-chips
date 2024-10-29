import { smileys } from "./smileys"
import { people } from "./people"
export type EmojiCategory =
  | "smileys"
  | "people"
  | "animals_nature"
  | "food_drink"
  | "activity"
  | "travel_places"
  | "objects"
  | "symbols"
  | "flags"

export type Group = "people" | "places" | "things"

export type Color =
  | "red"
  | "blue"
  | "yellow"
  | "green"
  | "orange"
  | "purple"
  | "pink"
  | "brown"
  | "black"
  | "white"
  | "gray"

export interface Emoji {
  emoji: string
  unicode: string
  name: string
  label: string
  category: EmojiCategory
  group: Group
  primaryColor: Color
  secondaryColor: Color | null
  keywords: string[]
}

export type Emojis = {
  [key in EmojiCategory]: {
    [key: string]: Emoji
  }
}

export const emojis: Emojis = {
  smileys,
  people,
  animals_nature: {},
  food_drink: {},
  activity: {},
  travel_places: {},
  objects: {},
  symbols: {},
  flags: {},
}
