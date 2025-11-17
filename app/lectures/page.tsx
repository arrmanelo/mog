"use client"

import { useState } from "react"
import  Header from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLectures } from "@/lib/hooks/use-lectures"
import { Search, Calendar, User } from "lucide-react"
import Link from "next/link"

export default function LecturesPage() {
  const { lectures } = useLectures()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredLectures = lectures.filter(
    (lecture) =>
      lecture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lecture.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lecture.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const categories = Array.from(new Set(lectures.map((l) => l.category)))

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Лекции</h1>
            <p className="text-muted-foreground text-lg">
              Текстовые материалы лекций по информатике и смежным дисциплинам
            </p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по названию, описанию или категории..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>

          {/* Lectures List */}
          <div className="space-y-4">
            {filteredLectures.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">Лекции не найдены</CardContent>
              </Card>
            ) : (
              filteredLectures.map((lecture) => (
                <Link key={lecture.id} href={`/lectures/${lecture.id}`}>
                  <Card className="transition-all hover:shadow-lg hover:border-primary/50">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="mb-2">{lecture.title}</CardTitle>
                          <CardDescription className="text-base">{lecture.description}</CardDescription>
                        </div>
                        <Badge>{lecture.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(lecture.date).toLocaleDateString("ru-RU")}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {lecture.author}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
