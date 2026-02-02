"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Pencil, Trash2, Plus } from "lucide-react";
import { AppDispatch, RootState } from "@/src/utils/store";
import { DeleteRecipe, GetMyRecipes } from "@/src/api/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MyRecipesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { recipes, loading } = useSelector((state: RootState) => state.counter);

  const statusMap = {
    published: {
      label: "Опубликовано",
      className: "bg-green-100 text-green-700",
    },
    pending: {
      label: "На модерации",
      className: "bg-orange-100 text-orange-700",
    },
    draft: {
      label: "Черновик",
      className: "bg-gray-100 text-gray-700",
    },
  };

  const router = useRouter()

  const FALLBACK_IMAGE = "/images/food.jpg";

  useEffect(() => {
    dispatch(GetMyRecipes());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    await dispatch(DeleteRecipe(id)).unwrap();
    dispatch(GetMyRecipes());
  };

  return (
    <div className="p-4 sm:p-10 space-y-8">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Мои рецепты</h1>
          <p className="text-sm text-gray-500">
            Управляйте своими кулинарными шедеврами
          </p>
        </div>

        <Link href="/addRecipe" className="hidden sm:block">
          <button className="cursor-pointer active:scale-[90%] transition flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-white hover:bg-orange-600">
            <Plus size={18} />
            Добавить рецепт
          </button>
        </Link>
      </div>

      <div className="grid gap-4 sm:hidden">
        {loading && <p className="text-center">Загрузка...</p>}

        {!loading && recipes.length === 0 && (
          <p className="text-center text-gray-500">
            У вас пока нет рецептов 🍽️
          </p>
        )}

        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="rounded-2xl border bg-white p-4 space-y-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-xl overflow-hidden bg-gray-100">
                <div className="cursor-pointer relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100"
                  onClick={() => router.push(`/home/${recipe.id}`)}
                >
                  <Image
                    src={recipe.image || FALLBACK_IMAGE}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 300px"
                  />
                </div>
              </div>

              <div className="flex-1">
                <p className="font-semibold">{recipe.title}</p>
                <p className="text-xs text-gray-500">
                  {recipe.total_time} мин • {recipe.category?.name}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${statusMap[recipe.status].className}`}
              >
                {statusMap[recipe.status].label}
              </span>

              <div className="flex gap-4">
                <Pencil
                  size={18}
                  onClick={() => router.push(`/editRecipe/${recipe.id}`)}
                  className="text-gray-500 hover:text-orange-500 cursor-pointer"
                />
                <Trash2
                  size={18}
                  className="text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={() => handleDelete(recipe.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden sm:block rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr className="text-left">
              <th className="p-4">Рецепт</th>
              <th>Категория</th>
              <th>Статус</th>
              <th>Дата</th>
              <th className="text-right p-4">Действия</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="p-6 text-center">
                  Загрузка...
                </td>
              </tr>
            )}

            {!loading &&
              recipes.map((recipe) => (
                <tr key={recipe.id} className="border-b last:border-none">
                  <td className="p-4 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden">
                      <div className="cursor-pointer relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100"
                        onClick={() => router.push(`/home/${recipe.id}`)}
                      >
                        <Image
                          src={recipe.image || FALLBACK_IMAGE}
                          alt={recipe.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 300px"
                        />
                      </div>
                    </div>

                    <div>
                      <p className="font-medium">{recipe.title}</p>
                      <p className="text-xs text-gray-500">
                        {recipe.total_time} мин
                      </p>
                    </div>
                  </td>

                  <td>{recipe.category?.name}</td>

                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusMap[recipe.status].className}`}
                    >
                      {statusMap[recipe.status].label}
                    </span>
                  </td>

                  <td>
                    {new Date(recipe.created_at).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-end gap-4">
                      <Pencil
                        size={18}
                        onClick={() => router.push(`/editRecipe/${recipe.id}`)}
                        className="cursor-pointer text-gray-500 hover:text-orange-500"
                      />
                      <Trash2
                        size={18}
                        className="cursor-pointer text-gray-500 hover:text-red-500"
                        onClick={() => handleDelete(recipe.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Link href="/addRecipe">
        <button className="cursor-pointer active:scale-[90%] transition sm:hidden fixed bottom-6 right-6 h-14 w-14 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg">
          <Plus size={26} />
        </button>
      </Link>
    </div >
  );
}
