// lib/hooks/usePhotos.ts
'use client'

import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export function usePhotos() {
  const [photos, setPhotos] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.storage
        .from('photos') // ← твой бакет
        .list('', {
          limit: 100,
          // sort убрали — он не поддерживается в .list()
        })

      if (error || !data) {
        console.error('Ошибка загрузки фото:', error)
        setLoading(false)
        return
      }

      // Сортируем по дате создания вручную (новые сверху)
      const sortedFiles = data.sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      })

      const urls = await Promise.all(
        sortedFiles.map(async (file) => {
          const { data: signed } = await supabase.storage
            .from('photos')
            .createSignedUrl(file.name, 60 * 60 * 24 * 7) // 7 дней

          return signed?.signedUrl || ''
        })
      )

      setPhotos(urls.filter(Boolean))
      setLoading(false)
    }

    load()
  }, [])

  return { photos, loading }
}