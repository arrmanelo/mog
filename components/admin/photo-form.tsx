'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabase"
import { useState } from "react"

interface Photo {
  id?: string
  url: string
  title?: string | null
}

interface PhotoFormProps {
  photo?: Photo
  onSubmit: (file: File, title: string) => Promise<void>
  onCancel: () => void
}

export function PhotoForm({ photo, onSubmit, onCancel }: PhotoFormProps) {
  const [title, setTitle] = useState(photo?.title ?? "")
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file && !photo) {
      alert("Выберите фото")
      return
    }

    setUploading(true)
    try {
      await onSubmit(file!, title)
      onCancel()
    } catch (err) {
      alert("Ошибка сохранения")
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Название фотографии</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Например: День открытых дверей 2025"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Фотография</Label>
        {!photo && (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
          />
        )}
        {photo && (
          <div className="space-y-3">
            <div className="bg-muted rounded-lg overflow-hidden max-w-xs">
              <img src={photo.url} alt={photo.title || ""} className="w-full h-48 object-cover" />
            </div>
            <p className="text-sm text-muted-foreground">
              Оставьте поле пустым, если не хотите менять фото
            </p>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel} disabled={uploading}>
          Отмена
        </Button>
        <Button type="submit" disabled={uploading}>
          {uploading ? "Сохранение..." : photo ? "Обновить" : "Добавить"}
        </Button>
      </div>
    </form>
  )
}