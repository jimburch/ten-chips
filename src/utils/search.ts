import type { Emojis } from "@/utils/emojis"

export function searchEmojis(searchString: string, emojis: Emojis): object[] {
  const results: object[] = []
  const lowercaseSearch = searchString.toLowerCase()

  Object.values(emojis as Emojis).forEach((category) => {
    Object.entries(category).forEach(([key, emoji]) => {
      if (key.toLowerCase().includes(lowercaseSearch)) {
        results.push({ [key]: emoji })
      }
    })
  })

  return results
}
