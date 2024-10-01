import React from "react"

export default function EmojiButton({
  emoji,
  onClick,
}: {
  emoji: string
  onClick: () => void
}) {
  return (
    <button
      className="bg-transparent border-none text-5xl hover:scale-110 transition-transform duration-100 ease-linear"
      onClick={onClick}
    >
      <span className="inline-block">{emoji}</span>
    </button>
  )
}
