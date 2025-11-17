// app/photos/page.tsx — исправлено: контент ниже header, без наложения

"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePhotos } from "@/lib/hooks/use-photos";
import { Search, Calendar, Camera } from "lucide-react";
import type { Photo } from "@/lib/data/photos";

export default function PhotosPage() {
  const { photos } = usePhotos();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const filteredPhotos = photos.filter(
    (photo) =>
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.event.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const events = Array.from(new Set(photos.map((p) => p.event)));

  return (
    <div className="min-h-screen">
      <Header />

      {/* Добавил pt-20 — отступ под fixed/absolute header */}
      <main className="container mx-auto px-4 py-8 pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Фотогалерея</h1>
            <p className="text-muted-foreground text-lg">Фотографии с лекций и учебных мероприятий</p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по названию, описанию или событию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Event filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {events.map((event) => (
              <Badge key={event} variant="secondary">
                {event}
              </Badge>
            ))}
          </div>

          {/* Photo Grid */}
          {filteredPhotos.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">Фотографии не найдены</CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((photo) => (
                <Card
                  key={photo.id}
                  className="overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="relative aspect-video">
                    <Image src={photo.imageUrl || "/placeholder.svg"} alt={photo.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold line-clamp-1">{photo.title}</h3>
                      <Badge variant="outline" className="shrink-0">
                        {photo.event}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{photo.description}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(photo.date).toLocaleDateString("ru-RU")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Camera className="h-3 w-3" />
                        {photo.photographer}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Photo Detail Dialog */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl">
          {selectedPhoto && (
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={selectedPhoto.imageUrl || "/placeholder.svg"}
                  alt={selectedPhoto.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-bold">{selectedPhoto.title}</h2>
                  <Badge>{selectedPhoto.event}</Badge>
                </div>
                <p className="text-muted-foreground">{selectedPhoto.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(selectedPhoto.date).toLocaleDateString("ru-RU")}
                  </div>
                  <div className="flex items-center gap-1">
                    <Camera className="h-4 w-4" />
                    {selectedPhoto.photographer}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}