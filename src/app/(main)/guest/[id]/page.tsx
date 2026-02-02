'use client'

import { GetRecipeById } from '@/src/api/api'
import { AppDispatch, RootState } from '@/src/utils/store'
import { Timer, Star, User, CircleChevronLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function RecipeDetailPage() {
    const { id } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const { recipeDetail, loadingRecipeDetail } = useSelector((state: RootState) => state.counter)

    const FALLBACK_IMAGE = "/images/food.jpg";

    const youtubeSearchUrl = `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(
        recipeDetail?.title + " recipe"
    )}`;


    useEffect(() => {
        if (id) {
            dispatch(GetRecipeById(Number(id)))
        }
    }, [id, dispatch])


    if (loadingRecipeDetail || !recipeDetail) {
        return <p className="p-10 text-center">Загрузка...</p>
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            {localStorage.getItem("access") ? (
                <Link href="/home">
                    <CircleChevronLeft size={35} color='gray' />
                </Link>
            ) : (
                <Link href="/guest">
                    <CircleChevronLeft size={35} />
                </Link>
            )}
            <div className="relative h-[380px] rounded-3xl overflow-hidden mt-3">
                <Image
                    src={recipeDetail.image || FALLBACK_IMAGE}
                    alt={recipeDetail.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-6 left-6 text-white space-y-2">
                    <span className="px-3 py-1 bg-orange-500 rounded-full text-xs">
                        {recipeDetail.category.name}
                    </span>
                    <p className="text-3xl font-bold">
                        {recipeDetail.title}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-white/90">
                        <User size={14} />
                        {recipeDetail.author}
                    </div>
                </div>
            </div>

            <div className="flex gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                    <Timer size={16} /> {recipeDetail.total_time} мин
                </div>
                <div className="flex items-center gap-1">
                    <Star size={16} className="text-orange-500" />
                    {recipeDetail.servings} feedback
                </div>
                <div>
                    Страна: <b>{recipeDetail.country.name}</b>
                </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
                {recipeDetail.description}
            </p>

            <div>
                <p className="text-xl font-semibold mb-3">
                    Ингредиенты
                </p>
                <ul className="space-y-2">
                    {recipeDetail.ingredients.map((item: any) => (
                        <li
                            key={item.id}
                            className="flex justify-between border-b pb-2 text-sm"
                        >
                            <span>{item.name}</span>
                            <span className="text-gray-500">
                                {item.amount} {item.unit}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <p className="text-xl font-semibold mb-3">
                    Шаги приготовления
                </p>
                <div className="space-y-4">
                    {recipeDetail.instructions.map((step: any) => (
                        <div
                            key={step.id}
                            className="p-4 rounded-xl bg-gray-50"
                        >
                            <p className="font-semibold mb-1">
                                Шаг {step.step_number}
                            </p>
                            <p className="text-gray-600">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <p className="text-xl font-semibold mb-3">
                    Видео рецепт
                </p>

                <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
                    <iframe
                        src={youtubeSearchUrl}
                        title="YouTube video"
                        className="absolute inset-0 w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>

        </div>
    )
}
