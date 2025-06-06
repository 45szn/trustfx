"use client";

import { ReactNode, useEffect, useState } from "react";

interface AnimatedTextProps {
  text: (string | ReactNode)[];
  className?: string;
  delay?: number;
  wordDelay?: number;
}

export default function AnimatedText({
  text,
  className = "",
  delay = 500,
  wordDelay = 200,
}: AnimatedTextProps) {
  const [visibleWords, setVisibleWords] = useState<number>(0);
  const words = text.flatMap((word) =>
    typeof word === "string" ? word.split(" ") : [word]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleWords((prev) => {
          if (prev < words.length) {
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, wordDelay);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [words.length, delay, wordDelay]);

  return (
    <h1 className={className}>
      {words.map((word, index) => {
        if (typeof word !== "string") {
          return <span key={index}>{word}</span>;
        }

        return (
          <span
            key={index}
            className={`inline-block transition-all duration-700 ease-out ${
              index < visibleWords
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4"
            }`}
            style={{
              transitionDelay: `${index * 50}ms`,
            }}
          >
            {word}&nbsp;
          </span>
        );
      })}
    </h1>
  );
}
