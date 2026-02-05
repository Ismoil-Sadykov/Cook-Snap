"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/utils/store";
import { EditRecipe, GetCategory, GetRecipeById } from "@/src/api/api";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ImageIcon, Video } from "lucide-react";

export default function EditRecipePage() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { id } = useParams();
    const recipeId = Number(id);

    const { category, loading } = useSelector(
        (state: RootState) => state.counter
    );

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [prepTime, setPrepTime] = useState(1);
    const [cookTime, setCookTime] = useState(1);
    const [servings, setServings] = useState(1);
    const [image, setImage] = useState<File | null>(null);
    const [video, setVideo] = useState<File | null>(null);

    const [ingredients, setIngredients] = useState<
        { name: string; amount: string; unit: string }[]
    >([]);

    const [instructions, setInstructions] = useState<
        { description: string }[]
    >([]);

    useEffect(() => {
        dispatch(GetCategory());

        dispatch(GetRecipeById(recipeId))
            .unwrap()
            .then((data) => {
                setTitle(data.title);
                setDescription(data.description);

                setCategoryId(
                    typeof data.category === "object"
                        ? data.category?.id ?? null
                        : data.category ?? null
                );

                setPrepTime(data.prep_time);
                setCookTime(data.cook_time);
                setServings(data.servings);

                setIngredients(data.ingredients || []);
                setInstructions(
                    data.instructions?.map((i: any) => ({
                        description: i.description,
                    })) || []
                );
            })
            .catch(() => toast.error("Ошибка загрузки рецепта ❌"));
    }, [dispatch, recipeId]);

    const handleSubmit = async () => {
        if (!title.trim() || !description.trim()) {
            toast.error("Заполните обязательные поля");
            return;
        }

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("prep_time", String(prepTime));
        formData.append("cook_time", String(cookTime));
        formData.append("servings", String(servings));

        if (categoryId) {
            formData.append("category", String(categoryId));
        }

        if (image) {
            formData.append("image", image);
        }

        if (video) {
            formData.append("video", video);
        }

        formData.append(
            "ingredients",
            JSON.stringify(
                ingredients.filter((i) => i.name.trim())
            )
        );

        formData.append(
            "instructions",
            JSON.stringify(
                instructions
                    .filter((s) => s.description.trim())
                    .map((s, index) => ({
                        step_number: index + 1,
                        description: s.description,
                    }))
            )
        );

        try {
            await dispatch(
                EditRecipe({ id: recipeId, payload: formData })
            ).unwrap();

            toast.success("Рецепт обновлён ✅");
            router.push("/myRecipes");
        } catch {
            toast.error("Ошибка при сохранении ❌");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 space-y-6">
            <h1 className="text-2xl font-semibold">
                Редактирование рецепта
            </h1>

            <input
                className="w-full border rounded-lg px-4 py-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Название"
            />

            <textarea
                className="w-full border rounded-lg px-4 py-2 h-28"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Описание"
            />

            <div className="grid grid-cols-3 gap-4">
                <input
                    type="number"
                    min={1}
                    value={prepTime}
                    onChange={(e) => setPrepTime(+e.target.value)}
                    className="border rounded-lg px-4 py-2"
                    placeholder="Подготовка"
                />
                <input
                    type="number"
                    min={1}
                    value={cookTime}
                    onChange={(e) => setCookTime(+e.target.value)}
                    className="border rounded-lg px-4 py-2"
                    placeholder="Готовка"
                />
                <input
                    type="number"
                    min={1}
                    value={servings}
                    onChange={(e) => setServings(+e.target.value)}
                    className="border rounded-lg px-4 py-2"
                    placeholder="Порции"
                />
            </div>

            <select
                className="w-full border rounded-lg px-4 py-2"
                value={categoryId ?? ""}
                onChange={(e) =>
                    setCategoryId(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
            >
                <option value="">Без категории</option>
                {category.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>

            <label className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed border-gray-300 p-4 transition hover:border-orange-500 hover:bg-orange-50">
                <ImageIconnpm run dev className="h-8 w-8 text-orange-500" />
                <div>
                    <p className="font-medium">Загрузить изображение</p>
                    <p className="text-sm text-gray-500">
                        JPG / PNG / WEBP
                    </p>
                </div>

                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
            </label>

            <label className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed border-gray-300 p-4 transition hover:border-orange-500 hover:bg-orange-50">
                <Video className="h-8 w-8 text-orange-500" />
                <div>
                    <p className="font-medium">Загрузить видео</p>
                    <p className="text-sm text-gray-500">
                        MP4 / MOV (необязательно)
                    </p>
                </div>

                <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => setVideo(e.target.files?.[0] || null)}
                />
            </label>

            <button
                disabled={loading}
                onClick={handleSubmit}
                className="rounded-xl bg-orange-500 px-6 py-3 text-white block mx-auto disabled:opacity-50"
            >
                {loading ? "Сохранение..." : "Сохранить изменения"}
            </button>
        </div>
    );
}
