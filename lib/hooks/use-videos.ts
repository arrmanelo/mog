"use client"

import { useState, useEffect } from "react"
import { type Video, initialVideos } from "@/lib/data/videos"

export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([])

  useEffect(() => {
    // Load videos from localStorage or use initial data
    const stored = localStorage.getItem("videos")
    if (stored) {
      setVideos(JSON.parse(stored))
    } else {
      setVideos(initialVideos)
      localStorage.setItem("videos", JSON.stringify(initialVideos))
    }
  }, [])

  const addVideo = (video: Omit<Video, "id" | "views">) => {
    const newVideo = {
      ...video,
      id: Date.now().toString(),
      views: 0,
    }
    const updated = [...videos, newVideo]
    setVideos(updated)
    localStorage.setItem("videos", JSON.stringify(updated))
  }

  const updateVideo = (id: string, video: Partial<Video>) => {
    const updated = videos.map((v) => (v.id === id ? { ...v, ...video } : v))
    setVideos(updated)
    localStorage.setItem("videos", JSON.stringify(updated))
  }

  const deleteVideo = (id: string) => {
    const updated = videos.filter((v) => v.id !== id)
    setVideos(updated)
    localStorage.setItem("videos", JSON.stringify(updated))
  }

  const incrementViews = (id: string) => {
    const updated = videos.map((v) => (v.id === id ? { ...v, views: v.views + 1 } : v))
    setVideos(updated)
    localStorage.setItem("videos", JSON.stringify(updated))
  }

  return {
    videos,
    addVideo,
    updateVideo,
    deleteVideo,
    incrementViews,
  }
}
