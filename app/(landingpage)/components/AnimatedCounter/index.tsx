"use client";

import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  useCommas?: boolean;
}

export default function AnimatedCounter({
  end,
  duration = 2000,
  delay = 0,
  prefix = "",
  suffix = "",
  className = "",
  useCommas = true,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  // Format number with commas
  const formatNumber = (num: number) => {
    if (useCommas) {
      return Math.floor(num).toLocaleString();
    }
    return Math.floor(num).toString();
  };

  // Intersection Observer to trigger animation when element is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Counter animation
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 4);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = end * easeOutQuart;

        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, end, duration, delay]);

  return (
    <span ref={counterRef} className={className}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}
