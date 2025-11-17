"use client"

import { useEffect, useRef } from "react"
import { useVideos } from "@/lib/hooks/use-videos"

export function useIncrementViews(id: string) {
  const { incrementViews } = useVideos()  
  const hasIncremented = useRef(false)   

  useEffect(() => {
    if (hasIncremented.current) return  
    hasIncremented.current = true

    incrementViews(id)  
    //бэк: fetch(`/api/videos/${id}/views`, { method: "POST" })
  }, [id, incrementViews])
}