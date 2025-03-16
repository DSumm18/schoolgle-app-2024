"use client"

import { useState } from "react"

export function SchoolgleLogo({ size = "text-2xl" }: { size?: string }) {
  const [activeLetters, setActiveLetters] = useState<Record<number, boolean>>({})

  const handleMouseEnter = (index: number) => {
    setActiveLetters((prev) => ({ ...prev, [index]: true }))
  }

  const handleMouseLeave = (index: number) => {
    setActiveLetters((prev) => ({ ...prev, [index]: false }))

    // Get the letter element
    const letter = document.getElementById(`schoolgle-letter-${index}`)
    if (letter) {
      // Remove the animation class first to reset it
      letter.classList.remove("letter-bounce")
      // Force a reflow to ensure the animation restarts
      void letter.offsetWidth
      // Add the animation class back
      letter.classList.add("letter-bounce")
    }
  }

  const letters = [
    { char: "S", color: "text-blue-500 dark:text-blue-400" },
    { char: "c", color: "text-red-500 dark:text-red-400" },
    { char: "h", color: "text-yellow-500 dark:text-yellow-400" },
    { char: "o", color: "text-blue-500 dark:text-blue-400" },
    { char: "o", color: "text-green-500 dark:text-green-400" },
    { char: "g", color: "text-red-500 dark:text-red-400" },
    { char: "l", color: "text-yellow-500 dark:text-yellow-400" },
    { char: "e", color: "text-blue-500 dark:text-blue-400" },
  ]

  return (
    <span className={`font-bold ${size}`}>
      {letters.map((letter, index) => (
        <span
          key={index}
          id={`schoolgle-letter-${index}`}
          className={`${letter.color} inline-block transition-transform ${
            activeLetters[index] ? "scale-125" : ""
          } letter-bounce`}
          style={{ animationDelay: `${index * 0.1}s` }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          {letter.char}
        </span>
      ))}
    </span>
  )
}