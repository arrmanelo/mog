// app/photos/page.tsx — 0 ошибок, работает с Supabase Storage
"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePhotos } from "@/lib/hooks/use-photos"; 
import { Search } from "lucide-react";

export default function PhotosPage() {
  const { photos, loading } = usePhotos();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Фильтрация по части URL (имени файла)
  const filteredPhotos = photos.filter((url: string) =>
    url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
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
                placeholder="Поиск по фото..."
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
                Фотографии не найдены
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPhotos.map((url: string, index: number) => (
                <Card
                  key={index}
                  className="overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02]"
                  onClick={() => setSelectedPhoto(url)}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={url}
                      alt={`Фото ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Модалка */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-5xl p-0 border-0">
          {selectedPhoto && (
            <div className="relative w-full h-screen max-h-screen">
              <Image
                src={selectedPhoto}
                alt="Увеличенное фото"
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}