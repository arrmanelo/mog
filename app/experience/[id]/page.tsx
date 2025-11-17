"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useExperiences } from "@/lib/hooks/use-experiences"
import { ArrowLeft, Heart, MessageSquare, Calendar, User } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"

export default function ExperienceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { experiences, toggleLike, addComment } = useExperiences()
  const router = useRouter()
  const [commentText, setCommentText] = useState("")

  const experience = experiences.find((e) => e.id === id)

  if (!experience) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Запись не найдена</h1>
            <Link href="/experience">
              <Button>Вернуться к списку</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const handleAddComment = () => {
    if (commentText.trim()) {
      addComment(id, {
        author: "Гость",
        content: commentText,
        date: new Date().toISOString(),
      })
      setCommentText("")
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>

          <Card>
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl font-bold text-balance">{experience.title}</h1>
                <Badge>{experience.category}</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="font-medium">{experience.author}</span>
                <span>• {experience.authorRole}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(experience.date).toLocaleDateString("ru-RU")}
                </div>
                <button
                  onClick={() => toggleLike(id)}
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
            </CardHeader>
            <CardContent>
              <div className="prose prose-slate max-w-none dark:prose-invert">
                <ReactMarkdown>{experience.content}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card className="mt-8">
            <CardHeader>
              <h2 className="text-2xl font-bold">Комментарии ({experience.comments.length})</h2>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Comment */}
              <div className="space-y-2">
                <Textarea
                  placeholder="Поделитесь своим мнением..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={3}
                />
                <Button onClick={handleAddComment} disabled={!commentText.trim()}>
                  Добавить комментарий
                </Button>
              </div>

              {/* Comments List */}
              {experience.comments.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Пока нет комментариев. Будьте первым!</p>
              ) : (
                <div className="space-y-4">
                  {experience.comments.map((comment) => (
                    <div key={comment.id} className="border-l-2 border-primary pl-4 py-2">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-sm">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(comment.date).toLocaleDateString("ru-RU")}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
