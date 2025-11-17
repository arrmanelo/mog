"use client"

import { useState, useEffect } from "react"
import { type Lecture, initialLectures } from "@/lib/data/lectures"

export function useLectures() {
  const [lectures, setLectures] = useState<Lecture[]>([])

  useEffect(() => {
    // Load lectures from localStorage or use initial data
    const stored = localStorage.getItem("lectures")
    if (stored) {
      setLectures(JSON.parse(stored))
    } else {
      setLectures(initialLectures)
      localStorage.setItem("lectures", JSON.stringify(initialLectures))
    }
  }, [])

  const addLecture = (lecture: Omit<Lecture, "id">) => {
    const newLecture = {
      ...lecture,
      id: Date.now().toString(),
    }
    const updated = [...lectures, newLecture]
    setLectures(updated)
    localStorage.setItem("lectures", JSON.stringify(updated))
  }

  const updateLecture = (id: string, lecture: Partial<Lecture>) => {
    const updated = lectures.map((l) => (l.id === id ? { ...l, ...lecture } : l))
    setLectures(updated)
    localStorage.setItem("lectures", JSON.stringify(updated))
  }

  const deleteLecture = (id: string) => {
    const updated = lectures.filter((l) => l.id !== id)
    setLectures(updated)
    localStorage.setItem("lectures", JSON.stringify(updated))
  }

  return {
    lectures,
    addLecture,
    updateLecture,
    deleteLecture,
  }
}
