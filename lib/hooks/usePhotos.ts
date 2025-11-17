// lib/hooks/usePhotos.ts
'use client'

import { supabase } from '@/lib/supabase'
import { useEffect, useState, useCallback } from 'react'

export type Photo = {
  id: string
  url: string
  title: string | null
  created_at: string
}

export function usePhotos() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadPhotos = useCallback(async () => {
    setIsLoading(true)
    
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
      setPhotos([])
    } else {
      setPhotos(data || [])
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    loadPhotos()
  }, [loadPhotos])

  const addPhoto = async (file: File, title: string) => {
    const fileName = `${Date.now()}_${file.name}`
    const { error: uploadError } = await supabase.storage
      .from('photos')
      .upload(fileName, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('photos')
      .getPublicUrl(fileName)

    const { error: dbError } = await supabase
      .from('photos')
      .insert({ url: publicUrl, title })

    if (dbError) throw dbError

    await loadPhotos()
  }

  const updatePhoto = async (id: string, file: File | null, title: string) => {
    const updates: any = { title }

    if (file) {
      // Если есть новый файл — удаляем старый и загружаем новый
      const oldPhoto = photos.find(p => p.id === id)
      const oldFileName = oldPhoto?.url.split('/').pop()?.split('?')[0]
      if (oldFileName) {
        await supabase.storage.from('photos').remove([oldFileName])
      }

      const newFileName = `${Date.now()}_${file.name}`
      const { error } = await supabase.storage.from('photos').upload(newFileName, file)
      if (error) throw error

      const { data: { publicUrl } } = supabase.storage.from('photos').getPublicUrl(newFileName)
      updates.url = publicUrl
    }

    const { error } = await supabase.from('photos').update(updates).eq('id', id)
    if (error) throw error

    await loadPhotos()
  }

  const deletePhoto = async (id: string) => {
    const photo = photos.find(p => p.id === id)
    if (photo) {
      const fileName = photo.url.split('/').pop()?.split('?')[0]
      if (fileName) await supabase.storage.from('photos').remove([fileName])
    }
    await supabase.from('photos').delete().eq('id', id)
    await loadPhotos()
  }

  return {
    photos,
    isLoading,
    addPhoto,
    updatePhoto,
    deletePhoto,
    refetch: loadPhotos
  }
}