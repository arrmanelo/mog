// app/page.tsx
"use client";

import Link from "next/link";
import Header from "@/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Image as ImageIcon, Video, MessageSquare, GraduationCap } from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  // Слайды новостей
  const slides = [
    { id: 1, img: "/placeholder.jpg", text: "Здесь что то будет в будущем" },
    { id: 2, img: "/placeholder.jpg", text: "Здесь что то будет в будущем 2" },
    { id: 3, img: "/placeholder.jpg", text: "Здесь что то будет в будущем 3" },
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
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* HERO + КАРТОЧКИ — занимает всё оставшееся место */}
      <section className="relative flex-1 bg-gray-900 overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src="/main2.mp4"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
          <div className="grid lg:grid-cols-12 gap-8 xl:gap-12 items-start">

            {/* HERO - левая часть */}
            <div className="lg:col-span-6 xl:col-span-7">
              <div className="w-auto max-w-2xl bg-white/80 backdrop-blur-sm p-6 md:p-10 lg:p-12 rounded-3xl shadow-xl">
                <GraduationCap className="h-14 w-14 text-green-600 mb-6" />
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block text-gray-900">МЕТОДИЧЕСКАЯ</span>
                  <span className="block text-orange-700">КОПИЛКА</span>
                  <span className="block text-green-600">ДЛЯ УЧИТЕЛЕЙ</span>
                </h1>
                
                <p className="mt-6 text-lg text-gray-700">Полезный ресурс для обмена педагогическим опытом</p>

                {/* Новость */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-20 w-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={slides[current].img} alt="" className="h-full w-full object-cover" />
                  </div>
                  <p className="text-sm text-gray-700">{slides[current].text}</p>
                </div>

                {/* Навигация слайдера */}
                <div className="mt-8 flex items-center justify-between">
                  <span className="font-medium text-orange-700 text-base">
                    {current + 1}/{slides.length}
                  </span>

                  <div className="flex gap-4">
                    <button
                      onClick={prev}
                      className="h-12 w-12 rounded-full border-[3px] border-orange-700 text-orange-700 flex items-center justify-center hover:bg-orange-50 transition-all active:scale-90"
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <button
                      onClick={next}
                      className="h-12 w-12 rounded-full border-[3px] border-orange-700 text-orange-700 flex items-center justify-center hover:bg-orange-50 transition-all active:scale-90"
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* КАРТОЧКИ РАЗДЕЛОВ - 2 × 2 */}
            <div className="lg:col-span-6 xl:col-span-5 mt-8 lg:mt-0">
              <h2 className="text-3xl font-bold mb-8 text-white drop-shadow-lg">Разделы</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {features.map((f) => {
                  const Icon = f.icon;
                  return (
                    <Link key={f.href} href={f.href} className="block">
                      <Card className="group h-full bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-green-400 cursor-pointer overflow-hidden">
                        <CardHeader className="pb-4 pt-6">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors flex-shrink-0">
                              <Icon className="h-10 w-10 text-green-600" />
                            </div>
                            <CardTitle className="text-xl text-gray-900 leading-tight">
                              {f.title}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 px-6 pb-6">
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

          </div>
        </div>
      </section>

      {/* ФУТЕР — всегда внизу, вплотную к видео */}
   {/* КРАСИВЫЙ ФУТЕР 2025 */}
<footer className="border-t border-gray-200 bg-gradient-to-t from-gray-50 to-white shadow-lg">
  <div className="container mx-auto px-6 py-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

      {/* Левая колонка — контакты */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Наши контакты
        </h3>
        <div className="space-y-2 text-gray-600">
          <p className="flex items-center gap-2">
            <span className="text-green-600">•</span> +7 (747) 737-80-92
          </p>
          <p className="flex items-center gap-2">
            <span className="text-green-600">•</span> +7 (708) 939-80-60
          </p>
          <p className="flex items-center gap-2">
            <span className="text-green-600">•</span> +7 (747) 934-92-38
          </p>
        </div>
      </div>

      {/* Правая колонка — копирайт + поддержка */}
      <div className="space-y-4 text-center md:text-right">
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          При поддержке Gym Coders
        </div>
        <p className="text-sm text-gray-500 mt-6">
          © 2025 <span className="font-semibold text-gray-700">Методическая копилка</span><br />
          Все права защищены
        </p>
      </div>

    </div>

  </div>
</footer>
    </div>
  );
}