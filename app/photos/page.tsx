"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePhotos, type Photo } from "@/lib/hooks/usePhotos";
import { Search } from "lucide-react";

export default function PhotosPage() {
  const { photos, isLoading } = usePhotos(); // ← исправлено: isLoading, а не isloading
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Фильтрация по названию (title) — теперь красиво и по-человечески
  const filteredPhotos = photos.filter((photo) =>
    photo.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <p className="text-xl">Загрузка галереи...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Фотогалерея</h1>
            <p className="text-muted-foreground text-lg">
              Фотографии с лекций и учебных мероприятий
            </p>
          </div>

          {/* Поиск */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по названию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Галерея */}
          {filteredPhotos.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center text-muted-foreground text-lg">
                {searchQuery ? "Фотографии не найдены" : "Галерея пуста"}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPhotos.map((photo) => (
                <Card
                  key={photo.id}
                  className="overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02] group"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={photo.url}
                      alt={photo.title || "Фото"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {/* Подпись появляется при наведении */}
                    {photo.title && (
                      <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-70 text-white p-3 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        {photo.title}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Модалка с увеличенным фото */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-6xl p-0 border-0 bg-transparent">
          {selectedPhoto && (
            <div className="relative w-full h-screen flex items-center justify-center">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.title || "Фото"}
                fill
                className="object-contain"
              />
              {selectedPhoto.title && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white px-6 py-3 rounded-full text-lg font-medium">
                  {selectedPhoto.title}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}