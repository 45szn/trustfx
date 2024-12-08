'use client'

import { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function SearchInput() {
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024) // 1024px is the default breakpoint for 'lg' in Tailwind
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const toggleSearch = () => {
    if (!isLargeScreen) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div className="relative flex items-center lg:w-80">
      {(isOpen || isLargeScreen) && (
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search..."
          className="w-full text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-700 focus:outline-none focus:ring"
        />
      )}
      {(isOpen || !isLargeScreen && (
        <Button
        variant="outline"
        size="icon"
        className={`${
          isLargeScreen ? 'pointer-events-none' : ''
        } absolute left-[-33px] top-0 bottom-0`}
        onClick={toggleSearch}
      >
        <Search className="h-4 w-4" />
      </Button>
      ))}
    </div>
  )
}

