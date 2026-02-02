'use client'

import { GetCategory, GetRecipes } from '@/src/api/api'
import { AppDispatch, RootState } from '@/src/utils/store'
import { Star, Timer } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function HomePage() {
  const { category, recipes, search, loading } = useSelector((state: RootState) => state.counter)
  const dispatch = useDispatch<AppDispatch>()
  const [activeCategory, setActiveCategory] = useState(0);

  const filteredRecipes =
    activeCategory === 0
      ? recipes
      : recipes?.filter(
        (recipe) => recipe.category.id === activeCategory
      );

  const FALLBACK_IMAGE = "/images/food.jpg";

  useEffect(() => {
    if (!category) {
      dispatch(GetCategory());
    }
    dispatch(GetRecipes(search))
    dispatch(GetCategory())
  }, [dispatch, search]);

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex gap-3 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveCategory(0)}
            className={`shrink-0 hover:scale-[105%] shadow-2xl rounded-full border px-4 py-2 text-sm transition cursor-pointer
                                ${activeCategory === 0
                ? "border-orange-500 bg-orange-500 text-white"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
          >
            Все рецепты
          </button>
          {category?.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveCategory(item.id)}
              className={`shrink-0 hover:scale-[105%] shadow-2xl rounded-full border px-4 py-2 text-sm transition cursor-pointer
                                    ${activeCategory === item.id
                  ? "border-orange-500 bg-orange-500 text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white p-4 shadow-sm">
          <div>
            <p className="text-lg font-semibold text-gray-900">
              Популярные рецепты
            </p>
            <p className="text-sm text-gray-500">
              На основе ваших недавних предпочтений
            </p>
          </div>

          <Link href="/allFoods">
            <button
              className="inline-flex items-center gap-2 rounded-full border border-orange-500 px-4 py-2 text-sm font-medium text-orange-500 transition hover:bg-orange-500 hover:text-white cursor-pointer">
              Смотреть все
              <span className="transition group-hover:translate-x-1">→</span>
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <RecipeSkeleton key={i} />
            ))
          ) : filteredRecipes?.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              🍽️ Рецепты не найдены
            </div>
          ) : (
            filteredRecipes.map((card) => (
              <div
                key={card.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm hover:scale-[105%] hover:shadow-2xl transition cursor-pointer"
              >
                <Link href={`/home/${card.id}`}>
                  <div className="relative h-40">
                    <Image
                      src={card.image || FALLBACK_IMAGE}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                    <p className="absolute left-3 top-3 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs text-white">
                      Создано:{" "}
                      {new Date(card.created_at).toLocaleDateString("ru-RU")}
                    </p>
                  </div>

                  <div className="space-y-2 p-4">
                    <span className="text-xs font-semibold text-orange-500">
                      {card.country.name}
                    </span>
                    <h3 className="text-sm font-medium leading-snug">
                      {card.title}
                    </h3>
                    <div className="flex justify-between text-xs text-gray-500">
                      <div className="flex gap-1 items-end">
                        <Timer /> {card.total_time} min
                      </div>
                      <div className="flex gap-1 items-end">
                        <Star color="orange" /> ({card.servings} feedback)
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

function RecipeSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="h-40 bg-gray-200" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-1/3 rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
        <div className="flex justify-between">
          <div className="h-3 w-1/4 rounded bg-gray-200" />
          <div className="h-3 w-1/4 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
