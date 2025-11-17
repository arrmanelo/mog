"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Photo } from "@/lib/data/photos"
import { supabase } from "@/lib/supabase"
import { usePhotos } from "@/lib/hooks/use-photos"  // ← ДОБАВИЛИ

interface PhotoFormProps {
  photo?: Photo
  onSubmit: (data: Omit<Photo, "id">) => void
  onCancel: () => void
}

export function PhotoForm({ photo, onSubmit, onCancel }: PhotoFormProps) {
  const { addPhoto } = usePhotos()  // ← ВЗЯЛИ addPhoto

  const [formData, setFormData] = useState({
    title: photo?.title || "",
    description: photo?.description || "",
    imageUrl: photo?.imageUrl || "",
    event: photo?.event || "",
    date: photo?.date || new Date().toISOString().split("T")[0],
    photographer: photo?.photographer || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Название</Label>
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
        <Label>URL изображения</Label>

        {/* Поле ввода URL */}
        <Input
          type="text"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          placeholder="Или загрузите файл ниже"
        />

        {/* Выбор файла */}
        <Input
          type="file"
          accept="image/*"
          onChange={async (e) => {  
            const file = e.target.files?.[0]
            if (!file) return

            const fileName = `public/${Date.now()}-${file.name}`

            // 1. Загрузка в Storage
            const { error } = await supabase.storage
              .from("photos")
              .upload(fileName, file)

            if (error) {
              alert("Ошибка загрузки файла: " + error.message)
              return
            }

            // 2. Получаем URL
            const { data } = supabase.storage.from("photos").getPublicUrl(fileName)
            const imageUrl = data.publicUrl

            // 3. ← СРАЗУ ВСТАВЛЯЕМ В БД
            const newPhoto = {
              title: formData.title || "Без названия",
              description: formData.description || "",
              imageUrl,
              event: formData.event || "Без события",
              photographer: formData.photographer || "Админ",
              date: formData.date,
            }

            await addPhoto(newPhoto)  // ← usePhotos вставит + обновит state

            // 4. Обновляем форму
            setFormData(prev => ({ ...prev, imageUrl: data.publicUrl }))
          }}
        />

        <p className="text-xs text-muted-foreground">Вы можете загрузить файл или вставить URL</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="event">Событие</Label>
          <Input
            id="event"
            value={formData.event}
            onChange={(e) => setFormData({ ...formData, event: e.target.value })}
            required
          />
        </div>

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
          <Label htmlFor="photographer">Фотограф</Label>
          <Input
            id="photographer"
            value={formData.photographer}
            onChange={(e) => setFormData({ ...formData, photographer: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">{photo ? "Сохранить изменения" : "Добавить фото"}</Button>
      </div>
    </form>
  )
}