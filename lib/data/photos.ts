export interface Photo {
  id: string
  title: string
  description: string
  imageUrl: string
  event: string
  date: string
  photographer: string
}



export const initialPhotos: Photo[] = [
  {
    id: "1",
    title: "Лекция по алгоритмам",
    description: "Студенты на лекции по алгоритмам и структурам данных",
    imageUrl: "/лекция.jpg",
    event: "Лекция",
    date: "2025-11-15",
    photographer: "GymCoders",
  },
  {
    id: "2",
    title: "Практическое занятие по программированию",
    description: "Работа студентов над проектами в компьютерном классе",
    imageUrl: "/практика.jpg",
    event: "Практика",
    date: "2025-11-15",
    photographer: "GymCoders",
  },
  {
    id: "3",
    title: "Семинар по базам данных",
    description: "Обсуждение проектирования баз данных",
    imageUrl: "/семинар.jpg",
    event: "Семинар",
    date: "2025-11-15",
    photographer: "GymCoders",  
  },
  {
    id: "4",
    title: "Конференция по информатике",
    description: "Выступление студентов на научной конференции",
    imageUrl: "/student-presentation-at-computer-science-conferenc.jpg",
    event: "Конференция",
    date: "2025-02-10",
    photographer: "Иванов И.И.",
  },
  {
    id: "5",
    title: "Хакатон",
    description: "Командная работа студентов на хакатоне",
    imageUrl: "/students-working-together-at-hackathon.jpg",
    event: "Мероприятие",
    date: "2025-02-15",
    photographer: "Петрова А.С.",
  },
  {
    id: "6",
    title: "Защита проектов",
    description: "Презентация итоговых проектов студентами",
    imageUrl: "/student-project-presentation-defense.jpg",
    event: "Защита",
    date: "2025-02-20",
    photographer: "Сидоров П.В.",
  },
]
