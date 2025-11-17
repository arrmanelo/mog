"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"
import { useExperiences } from "@/lib/hooks/use-experiences"
import { ArrowLeft } from "lucide-react"

export default function NewExperiencePage() {
  const { isAuthenticated } = useAuth()
  const { addExperience } = useExperiences()
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    authorRole: "",
    category: "",
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addExperience({
      ...formData,
      date: new Date().toISOString().split("T")[0],
    })
    router.push("/experience")
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>

          <Card>
            <CardHeader>
              <CardTitle>Поделиться педагогическим опытом</CardTitle>
              <CardDescription>Расскажите коллегам о своих методиках, находках и успешных практиках</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Заголовок</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Краткое название вашего опыта"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Содержание (Markdown)</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Подробно опишите ваш опыт, методики, результаты..."
                    rows={12}
                    className="font-mono text-sm"
                    required
                  />
                  <p className="text-xs text-muted-foreground">Поддерживается форматирование Markdown</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author">Автор</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Ваше ФИО"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="authorRole">Должность</Label>
                    <Input
                      id="authorRole"
                      value={formData.authorRole}
                      onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                      placeholder="Например: Доцент кафедры"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Категория</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Например: Методика преподавания"
                    required
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Отмена
                  </Button>
                  <Button type="submit">Опубликовать</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
