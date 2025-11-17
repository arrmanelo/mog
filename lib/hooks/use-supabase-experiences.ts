"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export type Experience = {
  id: string
  title: string
  content: string
  author: string
  authorRole: string
  date: string
  category?: string
  likes: number
  comments: { id: string; author: string; text: string }[]
  created_at?: string
}

export function useExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([])

  useEffect(() => {
    supabase.from("experiences").select("*").order("created_at", { ascending: false })
      .then(({ data }) => setExperiences(data || []))
  }, [])

  const addExperience = async (exp: Omit<Experience, "id" | "likes" | "comments">) => {
    const { data } = await supabase.from("experiences")
      .insert({ ...exp, likes: 0, comments: [] })
      .select()
    if (data) setExperiences(prev => [data[0], ...prev])
  }

  const updateExperience = async (id: string, updates: Partial<Experience>) => {
    const { data } = await supabase.from("experiences")
      .update(updates).eq("id", id).select()
    if (data) setExperiences(prev => prev.map(e => e.id === id ? data[0] : e))
  }

  const deleteExperience = async (id: string) => {
    await supabase.from("experiences").delete().eq("id", id)
    setExperiences(prev => prev.filter(e => e.id !== id))
  }

  return { experiences, addExperience, updateExperience, deleteExperience }
}