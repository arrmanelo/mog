'use client'

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogFooter } from "@/components/ui/dialog"

interface ExperienceFormProps {
  experience?: {
    id: string
    title: string
    content: string
    author: string
    authorRole: string
    date: string
    category?: string  // ← optional
    likes?: number
    comments?: any[]
  }
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function ExperienceForm({ experience, onSubmit, onCancel }: ExperienceFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: experience?.title || "",
      content: experience?.content || "",
      author: experience?.author || "",
      authorRole: experience?.authorRole || "",
      date: experience?.date || new Date().toISOString().slice(0, 10),
      category: experience?.category || "",
    }
  })

  const onFormSubmit = (data: any) => {
    onSubmit({
      ...data,
      category: data.category || undefined  // ← если пусто — undefined
    })
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Заголовок</Label>
        <Input {...register("title", { required: true })} />
        {errors.title && <p className="text-red-500">Обязательно</p>}
      </div>

      <div>
        <Label htmlFor="content">Содержание</Label>
        <Textarea {...register("content", { required: true })} rows={5} />
        {errors.content && <p className="text-red-500">Обязательно</p>}
      </div>

      <div>
        <Label htmlFor="author">Автор</Label>
        <Input {...register("author", { required: true })} />
        {errors.author && <p className="text-red-500">Обязательно</p>}
      </div>

      <div>
        <Label htmlFor="authorRole">Роль автора</Label>
        <Input {...register("authorRole", { required: true })} />
        {errors.authorRole && <p className="text-red-500">Обязательно</p>}
      </div>

      <div>
        <Label htmlFor="date">Дата</Label>
        <Input type="date" {...register("date", { required: true })} />
        {errors.date && <p className="text-red-500">Обязательно</p>}
      </div>

      <div>
        <Label htmlFor="category">Категория (опционально)</Label>
        <Input {...register("category")} placeholder="Например: IT, Алгоритмы" />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>Отмена</Button>
        <Button type="submit">{experience ? "Сохранить" : "Добавить"}</Button>
      </DialogFooter>
    </form>
  )
}