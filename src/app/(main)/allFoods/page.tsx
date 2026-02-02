"use client";

import { GetRecipes } from "@/src/api/api";
import { AppDispatch, RootState } from "@/src/utils/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FoodPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { recipes, loading, search } = useSelector(
    (state: RootState) => state.counter
  );

  const FALLBACK_IMAGE = "/images/food.jpg";

  useEffect(() => {
    dispatch(GetRecipes(search));
  }, [dispatch, search]);

  if (loading) {
    return <p className="text-center mt-10">Загрузка...</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">🍽️ Все рецепты</h1>

      {recipes.length === 0 ? (
        <p className="text-gray-500">Рецептов пока нет</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="group overflow-hidden rounded-2xl bg-white shadow hover:shadow-xl transition"
            >
              <Link href={`/home/${recipe.id}`}>
                <div className="relative h-48 w-full">
                  <Image
                    src={recipe.image || FALLBACK_IMAGE}
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />
                </div>

                <div className="p-5 space-y-2">
                  <h2 className="text-lg font-semibold line-clamp-1">
                    {recipe.title}
                  </h2>

                  <p className="text-sm text-gray-500 line-clamp-2">
                    {recipe.description}
                  </p>

                  <div className="flex justify-between text-xs text-gray-400 pt-2">
                    <span>⏱ {recipe.total_time} мин</span>
                    <span>🍽 {recipe.servings} порций</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
