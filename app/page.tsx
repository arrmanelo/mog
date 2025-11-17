// app/page.tsx — карточки "Разделы": красивее, под твой стиль (hero и остальное без изменений)

"use client";
import Link from "next/link";
import Header from "@/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Image as ImageIcon, Video, MessageSquare, GraduationCap } from "lucide-react";
import { useRef, useState } from "react";

export default function HomePage() {
  // Видео-пауза
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const togglePause = () => {
    if (videoRef.current) {
      isPaused ? videoRef.current.play() : videoRef.current.pause();
      setIsPaused(!isPaused);
    }
  };

  // Слайды новостей
  const slides = [
    { id: 1, img: "/.jpg", text: "Здесь что то будет в будущем" },
    { id: 2, img: "/.jpg", text: "Здесь что то будет в будущем 2" },
    { id: 3, img: "/.jpg", text: "Здесь что то будет в будущем 3" },
  ];
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  // Данные карточек
  const features = [
    { title: "Лекции", desc: "Текстовые материалы лекций по информатике и смежным дисциплинам", icon: BookOpen, href: "/lectures" },
    { title: "Фотогалерея", desc: "Фотографии с лекций и учебных мероприятий", icon: ImageIcon, href: "/photos" },
    { title: "Видеолекции", desc: "Видеозаписи лекций и образовательных материалов", icon: Video, href: "/videos" },
    { title: "Обмен опытом", desc: "Площадка для обмена педагогическим опытом между преподавателями", icon: MessageSquare, href: "/experience" },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO — без изменений */}
      <section className="relative h-screen w-full overflow-hidden">
        <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" autoPlay loop muted playsInline src="/main.mp4" />
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-x-8 md:inset-x-16 top-1/2 -translate-y-1/2 w-auto max-w-2xl bg-white/80 backdrop-blur-sm p-6 md:p-10 lg:p-12 rounded-3xl shadow-xl">
          <GraduationCap className="h-14 w-14 text-green-600 mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="block text-gray-900">МЕТОДИЧЕСКАЯ</span>
            <span className="block text-green-600">КОПИЛКА</span>
            <span className="block text-orange-700">ДЛЯ УЧИТЕЛЕЙ</span>
          </h1>
          <p className="mt-6 text-lg text-gray-700">Полезный ресурс для обмена педагогическим опытом</p>

          <div className="mt-6 flex items-center gap-4">
            <div className="h-20 w-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={slides[current].img || "/placeholder.svg"}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-700">{slides[current].text}</p>
          </div>

          <div className="mt-8 flex items-center justify-between text-sm text-gray-500">
            <span>{current + 1}/{slides.length}</span>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="h-8 w-8 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100"
              >
                ←
              </button>
              <button
                onClick={next}
                className="h-8 w-8 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <button onClick={togglePause} className="absolute bottom-8 right-8 bg-red-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition">
          {isPaused ? "▶ Play" : "⏸ Pause"} Video
        </button>
      </section>

      {/* РАЗДЕЛЫ — ПЕРЕДЕЛАННЫЕ КАРТОЧКИ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Разделы</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <Link key={f.href} href={f.href}>
                  <Card className="group h-full bg-white border border-gray-200 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-green-400 cursor-pointer overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                          <Icon className="h-8 w-8 text-green-600" />
                        </div>
                        <CardTitle className="text-xl text-gray-900">{f.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-gray-600 leading-relaxed">
                        {f.desc}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* О ПРОЕКТЕ — без изменений */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader><CardTitle className="text-2xl">О проекте</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Методическая копилка — это не просто сборник материалов, а живое сообщество преподавателей...</p>
              <p>Наша цель — создать удобную платформу для обмена знаниями...</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ФУТЕР — без изменений */}
      <footer className="border-t py-8 px-4 mt-16 bg-gray-50">
        <div className="container mx-auto flex flex-col md:flex-row justify-between text-sm text-muted-foreground">
          <div>
            <p>наши контакты:</p>
            <p>+7-(747)-737-80-92</p>
            <p>+7-(708)-939-80-60</p>
            <p>+7-(747)-934-92-38</p>
          </div>
          <div className="text-right mt-4 md:mt-0">
            <p>© 2025 Методическая копилка. При поддержке Gym Coders.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}