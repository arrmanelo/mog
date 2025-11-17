"use client"

import { useState, useEffect } from "react"
import { type Experience, type Comment, initialExperiences } from "@/lib/data/experiences"

export function useExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([])

  useEffect(() => {
    // Load experiences from localStorage or use initial data
    const stored = localStorage.getItem("experiences")
    if (stored) {
      setExperiences(JSON.parse(stored))
    } else {
      setExperiences(initialExperiences)
      localStorage.setItem("experiences", JSON.stringify(initialExperiences))
    }
  }, [])

  const addExperience = (experience: Omit<Experience, "id" | "likes" | "comments">) => {
    const newExperience = {
      ...experience,
      id: Date.now().toString(),
      likes: 0,
      comments: [],
    }
    const updated = [newExperience, ...experiences]
    setExperiences(updated)
    localStorage.setItem("experiences", JSON.stringify(updated))
  }

  const updateExperience = (id: string, experience: Partial<Experience>) => {
    const updated = experiences.map((e) => (e.id === id ? { ...e, ...experience } : e))
    setExperiences(updated)
    localStorage.setItem("experiences", JSON.stringify(updated))
  }

  const deleteExperience = (id: string) => {
    const updated = experiences.filter((e) => e.id !== id)
    setExperiences(updated)
    localStorage.setItem("experiences", JSON.stringify(updated))
  }

  const toggleLike = (id: string) => {
    const updated = experiences.map((e) => (e.id === id ? { ...e, likes: e.likes + 1 } : e))
    setExperiences(updated)
    localStorage.setItem("experiences", JSON.stringify(updated))
  }

  const addComment = (experienceId: string, comment: Omit<Comment, "id">) => {
    const newComment = {
      ...comment,
      id: Date.now().toString(),
    }
    const updated = experiences.map((e) =>
      e.id === experienceId ? { ...e, comments: [...e.comments, newComment] } : e,
    )
    setExperiences(updated)
    localStorage.setItem("experiences", JSON.stringify(updated))
  }

  return {
    experiences,
    addExperience,
    updateExperience,
    deleteExperience,
    toggleLike,
    addComment,
  }
}
