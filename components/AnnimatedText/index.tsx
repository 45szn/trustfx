"use client"

import { useEffect, useState } from "react"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  wordDelay?: number
}

export default function AnimatedText({ text, className = "", delay = 500, wordDelay = 200 }: AnimatedTextProps) {
  const [visibleWords, setVisibleWords] = useState<number>(0)
  const words = text.split(" ")

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleWords((prev) => {
          if (prev < words.length) {
            return prev + 1
          }
          clearInterval(interval)
          return prev
        })
      }, wordDelay)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [words.length, delay, wordDelay])

  return (
    <h1 className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-700 ease-out ${
            index < visibleWords ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
          style={{
            transitionDelay: `${index * 50}ms`,
          }}
        >
          {word}
          {index < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </h1>
  )
}
