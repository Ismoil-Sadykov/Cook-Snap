'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    setHasAccess(!!localStorage.getItem("access"));
  }, []);

  if (hasAccess === null) return null; // или loader

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-[#FFF9F4] px-4">
      <div className="flex flex-col items-center justify-center flex-1 text-center">
        <div className="mb-6">
          <Image
            src="/images/empty-plate.jpg"
            alt="Recipe not found"
            width={260}
            height={260}
            priority
          />
        </div>

        <h1 className="text-3xl font-semibold mb-3">
          Упс! Рецепт не найден
        </h1>

        <p className="max-w-md text-sm text-gray-600 mb-8">
          Похоже, это блюдо ещё не приготовили или страница
          переехала в другой кулинарный отдел.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={hasAccess ? "/home" : "/"}
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-white hover:bg-orange-600 transition"
          >
            <Home size={18} />
            Вернуться на главную
          </Link>

          <Link
            href="/recipes"
            className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-gray-800 border hover:bg-gray-50 transition"
          >
            <Search size={18} />
            Поиск рецептов
          </Link>
        </div>
      </div>

      <footer className="pb-6 text-center text-xs text-gray-400">
        <div className="flex justify-center gap-6 mb-3">
          <Link href="/about">О нас</Link>
          <Link href="/contacts">Контакты</Link>
          <Link href="/privacy">Политика конфиденциальности</Link>
          <Link href="/help">Помощь</Link>
        </div>

        <p>© 2024 CookSnap. Все права защищены.</p>
        <p className="mt-1">Сделано с любовью к кулинарии ❤️</p>
      </footer>
    </div>
  );
}
