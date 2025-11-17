export interface Video {
  id: string
  title: string
  description: string
  videoUrl: string
  thumbnail: string
  category: string
  duration: string
  date: string
  lecturer: string
  views: number
}


export const initialVideos: Video[] = [
  {
    id: "1",
    title: "Верстка сайтов на HTML и CSS для начинающих",
    description: "Уроки по созданию сайтов Полный курс HTML и CSS с нуля до профессионала",
    videoUrl: "https://www.youtube.com/watch?v=Bmtu5eNnjK8&t=3425s",
    thumbnail: "/placeholder.svg?key=video1",
    category: "Веб-разработка",
    duration: "7:26:25",
    date: "2025-11-15",
    lecturer: "GymCoders",
    views: 1250,
  },
  {
    id: "2",
    title: "Все о Frontend-разработке за 15 минут",
    description: "Немного про фронтендеров: кто они, чем занимаются и что им нужно знать.",
    videoUrl: "https://www.youtube.com/watch?v=yO3Ep_bQYgw&t=122s",
    thumbnail: "/placeholder.svg?key=video2",
    category: "Веб-разработка",
    duration: "15:13",
    date: "2025-11-15",
    lecturer: "GymCoders",
    views: 980,
  },
  {
    id: "3",
    title: "Персонаж в Blender. Базовый блокинг #1",
    description: "Моделирование персонажа с нуля в Blender. От базового блока до деталей — практические уроки по 3D",
    videoUrl: "https://www.youtube.com/playlist?list=PL5gQbivOi2OjCNRxSn0PrtcrCwneRlZdP",
    thumbnail: "/placeholder.svg?key=video3",
    category: "3D-моделирование",
    duration: "15 видео",
    date: "2025-11-15",
    lecturer: "GymCoders",
    views: 1450,  
  },
  
   
]
