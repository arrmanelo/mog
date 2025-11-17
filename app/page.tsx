'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from '@/components/header';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAuth } from "@/lib/auth-context"
import { useLectures } from "@/lib/hooks/use-lectures"
import { usePhotos } from "@/lib/hooks/use-photos"
import { useVideos } from "@/lib/hooks/use-videos"
import { useExperiences } from "@/lib/hooks/use-supabase-experiences"
import { LectureForm } from "@/components/admin/lecture-form"
import { PhotoForm }  from "@/components/admin/photo-form"
import { VideoForm } from "@/components/admin/video-form"
import { ExperienceForm } from "@/components/admin/experience-form"
import type { Experience } from "@/lib/hooks/use-supabase-experiences"
import type { Lecture } from "@/lib/data/lectures"
import type { Photo } from "@/lib/data/photos"
import type { Video } from "@/lib/data/videos"
import { Plus, Pencil, Trash2, BookOpen, ImageIcon, VideoIcon, MessageSquare } from "lucide-react"

export default function AdminPage() {
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const { lectures, addLecture, updateLecture, deleteLecture } = useLectures()
  const { photos, addPhoto, updatePhoto, deletePhoto } = usePhotos()
  const { videos, addVideo, updateVideo, deleteVideo } = useVideos()
  const { experiences, addExperience, updateExperience, deleteExperience } = useExperiences()

  const [isAddLectureDialogOpen, setIsAddLectureDialogOpen] = useState(false)
  const [isAddPhotoDialogOpen, setIsAddPhotoDialogOpen] = useState(false)
  const [isAddVideoDialogOpen, setIsAddVideoDialogOpen] = useState(false)
  const [isAddExperienceDialogOpen, setIsAddExperienceDialogOpen] = useState(false)
  const [editingLecture, setEditingLecture] = useState<Lecture | undefined>(undefined)
  const [editingPhoto, setEditingPhoto] = useState<Photo | undefined>(undefined)
  const [editingVideo, setEditingVideo] = useState<Video | undefined>(undefined)
  const [editingExperience, setEditingExperience] = useState<Experience | undefined>(undefined)

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push("/login")
    }
  }, [isAuthenticated, isAdmin, router])

  if (!isAuthenticated || !isAdmin) return null

  const handleAddLecture = (data: Omit<Lecture, "id">) => {
    addLecture(data)
    setIsAddLectureDialogOpen(false)
  }

  const handleUpdateLecture = (data: Omit<Lecture, "id">) => {
    if (editingLecture) {
      updateLecture(editingLecture.id, data)
      setEditingLecture(undefined)
    }
  }

  const handleDeleteLecture = (id: string) => {
    if (confirm("Удалить лекцию?")) deleteLecture(id)
  }

  const handleAddPhoto = async (data: Omit<Photo, "id">) => {
    await addPhoto(data)
    setIsAddPhotoDialogOpen(false)
  }

  const handleUpdatePhoto = async (data: Omit<Photo, "id">) => {
    if (editingPhoto) {
      await updatePhoto(editingPhoto.id, data)
      setEditingPhoto(undefined)
    }
  }

  const handleDeletePhoto = (id: string) => {
    if (confirm("Удалить фото?")) deletePhoto(id)
  }

  const handleAddVideo = (data: Omit<Video, "id" | "views">) => {
    addVideo(data)
    setIsAddVideoDialogOpen(false)
  }

  const handleUpdateVideo = (data: Omit<Video, "id" | "views">) => {
    if (editingVideo) {
      updateVideo(editingVideo.id, data)
      setEditingVideo(undefined)
    }
  }

  const handleDeleteVideo = (id: string) => {
    if (confirm("Удалить видео?")) deleteVideo(id)
  }

  const handleAddExperience = async (data: any) => {
    await addExperience(data)
    setIsAddExperienceDialogOpen(false)
  }

  const handleUpdateExperience = async (data: any) => {
    if (editingExperience) {
      await updateExperience(editingExperience.id, data)
      setEditingExperience(undefined)
    }
  }

  const handleDeleteExperience = async (id: string) => {
    if (confirm("Удалить запись?")) {
      await deleteExperience(id)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8 pt-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Панель администратора</h1>
              <p className="text-muted-foreground">Управление содержимым методической копилки</p>
            </div>
          </div>

          {/* Лекции */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Управление лекциями
                  </CardTitle>
                  <CardDescription>Всего лекций: {lectures.length}</CardDescription>
                </div>
                <Button onClick={() => setIsAddLectureDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить лекцию
                </Button>
              </div>  
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lectures.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Лекции отсутствуют</p>
                ) : (
                  lectures.map((lecture) => (
                    <div key={lecture.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50">
                      <div className="flex-1">
                        <h3 className="font-semibold">{lecture.title}</h3>
                        <p className="text-sm text-muted-foreground">{lecture.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingLecture(lecture)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteLecture(lecture.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Фото */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Управление фотогалереей
                  </CardTitle>
                  <CardDescription>Всего фотографий: {photos.length}</CardDescription>
                </div>
                <Button onClick={() => setIsAddPhotoDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить фото
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {photos.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Фотографии отсутствуют</p>
                ) : (
                  photos.map((photo) => (
                    <div key={photo.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50">
                      <div className="flex-1">
                        <h3 className="font-semibold">{photo.title}</h3>
                        <p className="text-sm text-muted-foreground">{photo.event}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingPhoto(photo)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeletePhoto(photo.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Видео */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <VideoIcon className="h-5 w-5" />
                    Управление видеолекциями
                  </CardTitle>
                  <CardDescription>Всего видео: {videos.length}</CardDescription>
                </div>
                <Button onClick={() => setIsAddVideoDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить видео
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {videos.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Видеолекции отсутствуют</p>
                ) : (
                  videos.map((video) => (
                    <div key={video.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50">
                      <div className="flex-1">
                        <h3 className="font-semibold">{video.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {video.category} • {video.duration}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingVideo(video)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteVideo(video.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
{/* Обмен опытом */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Управление обменом опытом
                  </CardTitle>
                  <CardDescription>Всего записей: {experiences.length}</CardDescription>
                </div>
                <Button onClick={() => setIsAddExperienceDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить запись
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {experiences.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Записи отсутствуют</p>
                ) : (
                  experiences.map((experience) => (
                    <div key={experience.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50">
                      <div className="flex-1">
                        <h3 className="font-semibold">{experience.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {experience.author} • {experience.category || "Без категории"}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingExperience(experience)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteExperience(experience.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Лекции */}
      <Dialog open={isAddLectureDialogOpen || !!editingLecture} onOpenChange={(open) => {
        if (!open) {
          setIsAddLectureDialogOpen(false)
          setEditingLecture(undefined)
        }
      }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingLecture ? "Редактировать лекцию" : "Добавить новую лекцию"}</DialogTitle>
            <DialogDescription>
              {editingLecture ? "Внесите изменения в лекцию" : "Заполните форму для добавления новой лекции"}
            </DialogDescription>
          </DialogHeader>
          <LectureForm
            lecture={editingLecture}
            onSubmit={editingLecture ? handleUpdateLecture : handleAddLecture}
            onCancel={() => {
              setIsAddLectureDialogOpen(false)
              setEditingLecture(undefined)
            }}
          />
        </DialogContent>
      </Dialog>
{/* Фото */}
      <Dialog open={isAddPhotoDialogOpen || !!editingPhoto} onOpenChange={(open) => {
        if (!open) {
          setIsAddPhotoDialogOpen(false)
          setEditingPhoto(undefined)
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPhoto ? "Редактировать фото" : "Добавить новое фото"}</DialogTitle>
            <DialogDescription>
              {editingPhoto ? "Внесите изменения в фотографию" : "Заполните форму для добавления фотографии"}
            </DialogDescription>
          </DialogHeader>
          <PhotoForm
            photo ={editingPhoto}
            onSubmit={editingPhoto ? handleUpdatePhoto : handleAddPhoto}
            onCancel={() => {
              setIsAddPhotoDialogOpen(false)
              setEditingPhoto(undefined)
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Видео */}
      <Dialog open={isAddVideoDialogOpen || !!editingVideo} onOpenChange={(open) => {
        if (!open) {
          setIsAddVideoDialogOpen(false)
          setEditingVideo(undefined)
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingVideo ? "Редактировать видео" : "Добавить новое видео"}</DialogTitle>
            <DialogDescription>
              {editingVideo ? "Внесите изменения в видеолекцию" : "Заполните форму для добавления видеолекции"}
            </DialogDescription>
          </DialogHeader>
          <VideoForm
            video={editingVideo}
            onSubmit={editingVideo ? handleUpdateVideo : handleAddVideo}
            onCancel={() => {
              setIsAddVideoDialogOpen(false)
              setEditingVideo(undefined)
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Опыт */}
      <Dialog open={isAddExperienceDialogOpen || !!editingExperience} onOpenChange={(open) => {
        if (!open) {
          setIsAddExperienceDialogOpen(false)
          setEditingExperience(undefined)
        }
      }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingExperience ? "Редактировать запись" : "Добавить новую запись"}</DialogTitle>
            <DialogDescription>
              {editingExperience ? "Внесите изменения в запись" : "Заполните форму для добавления записи"}
            </DialogDescription>
          </DialogHeader>
          <ExperienceForm
            experience={editingExperience}
            onSubmit={editingExperience ? handleUpdateExperience : handleAddExperience}
            onCancel={() => {
              setIsAddExperienceDialogOpen(false)
              setEditingExperience(undefined)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}