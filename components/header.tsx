// components/header.tsx — шире, выровнен с белым листом, поиск работает

"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, Image, Video, MessageSquare, LogIn, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      console.log("Поиск:", query);
      // router.push(`/search?q=${encodeURIComponent(query)}`); // потом подключишь
      setSearchOpen(false);
      setQuery("");
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 border-t-4 border-red-500 bg-white/90 backdrop-blur-sm">
      <div className="px-4 md:px-8 lg:px-12 py-2 flex items-center justify-between w-full">
        {/* ЛОГО — на уровне белого листа */}
        <Link
          href="/"
          className="flex items-center gap-2 text-green-600 font-medium text-lg tracking-wide ml-0"
        >
          <BookOpen className="h-8 w-8" />
          Методическая копилка
        </Link>

        {/* ДЕСКТОП НАВИГАЦИЯ */}
        <nav className="hidden lg:flex items-center gap-8 text-gray-800 font-medium mx-8">
          <Link href="/lectures" className="flex items-center gap-1 hover:text-green-600 transition">
            <BookOpen className="h-4 w-4" /> Лекции
          </Link>
          <Link href="/photos" className="flex items-center gap-1 hover:text-green-600 transition">
            <Image className="h-4 w-4" /> Фотогалерея
          </Link>
          <Link href="/videos" className="flex items-center gap-1 hover:text-green-600 transition">
            <Video className="h-4 w-4" /> Видеолекции
          </Link>
          <Link href="/experience" className="flex items-center gap-1 hover:text-green-600 transition">
            <MessageSquare className="h-4 w-4" /> Обмен опытом
          </Link>
        </nav>

        {/* ДЕСКТОП КНОПКИ — от края экрана */}
        <div className="flex items-center gap-4 mr-0">
          {/* Поиск */}
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full px-3 py-1 shadow-sm">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск материалов..."
                className="bg-transparent outline-none px-2 py-1 text-sm w-48 md:w-64"
                autoFocus
                onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
              />
              <Button type="submit" size="sm" className="ml-1 bg-green-600 hover:bg-green-700 rounded-full">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="text-gray-700 hover:text-green-600">
              <Search className="h-5 w-5" />
            </button>
          )}

          <Button asChild className="bg-green-600 hover:bg-green-700 rounded-full px-6">
            <Link href="/login" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Вход
            </Link>
          </Button>
        </div>

        {/* ГАМБУРГЕР */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-gray-700 mr-4"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* МОБИЛЬНОЕ МЕНЮ */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <nav className="flex flex-col px-4 py-4 space-y-4 text-gray-800 font-medium">
            <Link href="/lectures" className="flex items-center gap-2 hover:text-green-600 p-2 rounded">
              <BookOpen className="h-4 w-4" /> Лекции
            </Link>
            <Link href="/photos" className="flex items-center gap-2 hover:text-green-600 p-2 rounded">
              <Image className="h-4 w-4" /> Фотогалерея
            </Link>
            <Link href="/videos" className="flex items-center gap-2 hover:text-green-600 p-2 rounded">
              <Video className="h-4 w-4" /> Видеолекции
            </Link>
            <Link href="/experience" className="flex items-center gap-2 hover:text-green-600 p-2 rounded">
              <MessageSquare className="h-4 w-4" /> Обмен опытом
            </Link>

            <div className="pt-4 border-t flex flex-col gap-4">
              <Button asChild className="bg-green-600 hover:bg-green-700 rounded-full w-full">
                <Link href="/login" className="flex items-center justify-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Вход
                </Link>
              </Button>
              <button className="text-gray-700 flex items-center justify-center gap-2 p-2 hover:bg-gray-100 rounded">
                <Search className="h-5 w-5" />
                Поиск
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}