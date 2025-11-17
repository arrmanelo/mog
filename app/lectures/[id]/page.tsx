"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLectures } from "@/lib/hooks/use-lectures"
import { ArrowLeft, Calendar, User } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"

export default function LecturePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { lectures } = useLectures()
  const router = useRouter()

  const lecture = lectures.find((l) => l.id === id)

  if (!lecture) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Лекция не найдена</h1>
            <Link href="/lectures">
              <Button>Вернуться к списку лекций</Button>
            </Link>
          </div>
        </main>
      </div>
    )
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
                <h1 className="text-3xl font-bold text-balance">{lecture.title}</h1>
                <Badge>{lecture.category}</Badge>
              </div>
              <p className="text-lg text-muted-foreground">{lecture.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(lecture.date).toLocaleDateString("ru-RU")}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {lecture.author}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-slate max-w-none dark:prose-invert">
                <ReactMarkdown>{lecture.content}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
