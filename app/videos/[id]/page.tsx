"use client"

import { use, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useVideos } from "@/lib/hooks/use-videos"
import { ArrowLeft, Calendar, User, Eye, Clock } from "lucide-react"
import Link from "next/link"

export default function VideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { videos, incrementViews } = useVideos()
  const router = useRouter()

   const hasIncremented = useRef(false) 

  const video = videos.find((v) => v.id === id)

  useEffect(() => {
    if (video && !hasIncremented.current) {
      hasIncremented.current = true   
      incrementViews(id)
    }
  }, [id, video, incrementViews])

  if (!video) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Видеолекция не найдена</h1>
            <Link href="/videos">
              <Button>Вернуться к списку видеолекций</Button>
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
        <div className="max-w-5xl mx-auto">
          <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>

          <Card>
            <CardContent className="p-0">
              {/* Video Player */}
              <div className="relative aspect-video bg-black">
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-3xl font-bold text-balance">{video.title}</h1>
                  <Badge>{video.category}</Badge>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-4 border-b">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {video.lecturer}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(video.date).toLocaleDateString("ru-RU")}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {video.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {video.views} просмотров
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2">Описание</h2>
                  <p className="text-muted-foreground leading-relaxed">{video.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Videos */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Другие видеолекции</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos
                .filter((v) => v.id !== id && v.category === video.category)
                .slice(0, 3)
                .map((relatedVideo) => (
                  <Link key={relatedVideo.id} href={`/videos/${relatedVideo.id}`}>
                    <Card className="overflow-hidden transition-all hover:shadow-lg">
                      <CardHeader className="p-4">
                        <h3 className="font-semibold line-clamp-2 text-sm">{relatedVideo.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                          <Clock className="h-3 w-3" />
                          {relatedVideo.duration}
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
