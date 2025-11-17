"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Video } from "@/lib/data/videos"

interface VideoFormProps {
  video?: Video
  onSubmit: (data: Omit<Video, "id" | "views">) => void
  onCancel: () => void
}

export function VideoForm({ video, onSubmit, onCancel }: VideoFormProps) {
  const [formData, setFormData] = useState({
    title: video?.title || "",
    description: video?.description || "",
    videoUrl: video?.videoUrl || "",
    thumbnail: video?.thumbnail || "",
    category: video?.category || "",
    duration: video?.duration || "",
    date: video?.date || new Date().toISOString().split("T")[0],
    lecturer: video?.lecturer || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Название видеолекции</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Описание</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="videoUrl">URL видео (YouTube embed)</Label>
        <Input
          id="videoUrl"
          type="url"
          value={formData.videoUrl}
          onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
          placeholder="https://www.youtube.com/embed/..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="thumbnail">URL превью</Label>
        <Input
          id="thumbnail"
          type="url"
          value={formData.thumbnail}
          onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
          placeholder="/placeholder.svg?key=video"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Категория</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Длительность (мм:сс)</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="45:30"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Дата</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lecturer">Лектор</Label>
          <Input
            id="lecturer"
            value={formData.lecturer}
            onChange={(e) => setFormData({ ...formData, lecturer: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">{video ? "Сохранить изменения" : "Добавить видео"}</Button>
      </div>
    </form>
  )
}
