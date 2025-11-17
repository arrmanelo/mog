"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useExperiences } from "@/lib/hooks/use-experiences"
import { useAuth } from "@/lib/auth-context"
import { Search, Heart, MessageSquare, Calendar, User, Plus } from "lucide-react"

export default function ExperiencePage() {
  const { experiences, toggleLike } = useExperiences()
  const { isAuthenticated } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredExperiences = experiences.filter(
    (exp) =>
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const categories = Array.from(new Set(experiences.map((e) => e.category)))

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">Обмен опытом</h1>
              <p className="text-muted-foreground text-lg">
                Площадка для обмена педагогическим опытом между преподавателями
              </p>
            </div>
            {isAuthenticated && (
              <Link href="/experience/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Поделиться опытом
                </Button>
              </Link>
            )}
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по названию, содержанию или категории..."
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

          {/* Experiences List */}
          <div className="space-y-6">
            {filteredExperiences.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">Записи не найдены</CardContent>
              </Card>
            ) : (
              filteredExperiences.map((experience) => (
                <Card key={experience.id} className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <Link href={`/experience/${experience.id}`}>
                          <CardTitle className="hover:text-primary transition-colors cursor-pointer">
                            {experience.title}
                          </CardTitle>
                        </Link>
                        <CardDescription className="mt-2">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4" />
                            <span className="font-medium">{experience.author}</span>
                            <span className="text-muted-foreground">• {experience.authorRole}</span>
                          </div>
                        </CardDescription>
                      </div>
                      <Badge>{experience.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3 mb-4">{experience.content.split("\n")[0]}</p>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(experience.date).toLocaleDateString("ru-RU")}
                        </div>
                        <button
                          onClick={() => toggleLike(experience.id)}
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                        >
                          <Heart className="h-4 w-4" />
                          {experience.likes}
                        </button>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {experience.comments.length}
                        </div>
                      </div>
                      <Link href={`/experience/${experience.id}`}>
                        <Button variant="ghost" size="sm">
                          Читать далее
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
