"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export type Photo = {
  id: string
  title: string
  description: string
  imageUrl: string
  event: string
  date: string
  photographer: string
  created_at?: string
}

export function usePhotos() {
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    supabase
      .from("photos")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setPhotos(data || []))
  }, [])

  const addPhoto = async (photo: Omit<Photo, "id">) => {
    const { data } = await supabase.from("photos").insert(photo).select()
    if (data) setPhotos((prev) => [data[0], ...prev])
  }

  const updatePhoto = async (id: string, updates: Partial<Photo>) => {
    const { data } = await supabase
      .from("photos")
      .update(updates)
      .eq("id", id)
      .select()
    if (data) setPhotos((prev) => prev.map((p) => (p.id === id ? data[0] : p)))
  }

  const deletePhoto = async (id: string) => {
    await supabase.from("photos").delete().eq("id", id)
    setPhotos((prev) => prev.filter((p) => p.id !== id))
  }

  return { photos, addPhoto, updatePhoto, deletePhoto }
} 