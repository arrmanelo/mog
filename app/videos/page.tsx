"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useVideos } from "@/lib/hooks/use-videos"
import { Search, Eye, Calendar, User, Play } from "lucide-react"

export default function VideosPage() {
  const { videos } = useVideos()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const categories = Array.from(new Set(videos.map((v) => v.category)))

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8 pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Видеолекции</h1>
            <p className="text-muted-foreground text-lg">Видеозаписи лекций и образовательных материалов</p>
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

          {/* Videos Grid */}
          {filteredVideos.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">Видеолекции не найдены</CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <Link key={video.id} href={`/videos/${video.id}`}>
                  <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02]">
                    <div className="relative aspect-video bg-muted">
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all hover:bg-black/30">
                        <div className="bg-primary rounded-full p-4">
                          <Play className="h-8 w-8 text-primary-foreground fill-current" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <CardTitle className="text-base line-clamp-2">{video.title}</CardTitle>
                      </div>
                      <Badge variant="outline" className="w-fit">
                        {video.category}  
                      </Badge>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="line-clamp-2 mb-3">{video.description}</CardDescription>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {video.lecturer}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(video.date).toLocaleDateString("ru-RU")}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {video.views}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
