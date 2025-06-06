"use client";

import React from "react";
import { useEffect, useState } from "react";
import type { JSX } from "react/jsx-runtime";

interface AnimatedTextProps {
  text: string | (string | JSX.Element)[];
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

  // Convert text to array format if it's a string
  const textArray = Array.isArray(text) ? text : text.split(" ");

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleWords((prev) => {
          if (prev < textArray.length) {
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, wordDelay);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [textArray.length, delay, wordDelay]);

  // Helper function to check if element is a br tag
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isBrElement = (item: any) => {
    return React.isValidElement(item) && item.type === "br";
  };

  // Helper function to check if element is a div or complex element
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isComplexElement = (item: any) => {
    return React.isValidElement(item) && item.type !== "br";
  };

  return (
    <h1 className={className}>
      {textArray.map((item, index) => {
        // Handle br elements differently - don't wrap in span with inline-block
        if (isBrElement(item)) {
          return (
            <span
              key={index}
              className={`transition-all duration-700 ease-out ${
                index < visibleWords ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 50}ms`,
                display: "block",
                height: "0px",
                lineHeight: "0",
              }}
            >
              {item}
            </span>
          );
        }

        // Handle complex elements (like divs with buttons)
        if (isComplexElement(item)) {
          return (
            <span
              key={index}
              className={`block transition-all duration-700 ease-out ${
                index < visibleWords
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              {item}
            </span>
          );
        }

        // Handle regular text
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
            {item}
            {index < textArray.length - 1 &&
              typeof textArray[index + 1] === "string" &&
              !React.isValidElement(textArray[index + 1]) &&
              "\u00A0"}
          </span>
        );
      })}
    </h1>
  );
}
