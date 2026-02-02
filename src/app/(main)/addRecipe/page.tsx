"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/utils/store";
import { AddRecipe, GetCategory, GetCountry } from "@/src/api/api";
import { useRouter } from "next/navigation";

export default function AddRecipePage() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { loading, category, countries } = useSelector((state: RootState) => state.counter);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [prepTime, setPrepTime] = useState(1);
    const [cookTime, setCookTime] = useState(1);
    const [servings, setServings] = useState(1);
    const [categoryId, setCategoryId] = useState<number | undefined>();
    const [image, setImage] = useState<File | null>(null);
    const [video, setVideo] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [countryId, setCountryId] = useState<number | undefined>();

    const [ingredients, setIngredients] = useState([
        { name: "", amount: 0, unit: "g" },
    ]);

    const [instructions, setInstructions] = useState([
        { description: "" },
    ]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImage(file);

        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setVideo(file);
    };

    const handleSubmit = async () => {
        const validIngredients = ingredients.filter(i => i.name.trim());
        const validInstructions = instructions.filter(s => s.description.trim());

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("prep_time", String(prepTime));
        formData.append("cook_time", String(cookTime));
        formData.append("servings", String(servings));
        formData.append("ingredients", JSON.stringify(validIngredients));
        formData.append("instructions", JSON.stringify(
            validInstructions.map((s, i) => ({
                step_number: i + 1,
                description: s.description,
            }))
        ));

        if (countryId) {
            formData.append("country_id", String(countryId));
        }

        if (categoryId) {
            formData.append("category_id", String(categoryId));
        }

        if (image) formData.append("image", image);
        if (video) formData.append("video", video);

        await dispatch(AddRecipe(formData)).unwrap();
        router.push("/myRecipes");
    };

    useEffect(() => {
        dispatch(GetCategory());
        dispatch(GetCountry());
    }, [dispatch]);


    return (
        <div className="max-w-4xl mx-auto p-8 space-y-8">
            <h1 className="text-2xl font-semibold">Создание нового рецепта</h1>

            <div className="bg-white rounded-xl p-6 space-y-4">
                <input
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="Название рецепта *"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    className="w-full border rounded-lg px-4 py-2 h-28"
                    placeholder="Описание *"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className="grid grid-cols-3 gap-4">
                    <input
                        type="number"
                        className="border rounded-lg px-4 py-2"
                        placeholder="Подготовка (мин)"
                        onChange={(e) => setPrepTime(+e.target.value)}
                    />
                    <input
                        type="number"
                        className="border rounded-lg px-4 py-2"
                        placeholder="Готовка (мин)"
                        onChange={(e) => setCookTime(+e.target.value)}
                    />
                    <input
                        type="number"
                        className="border rounded-lg px-4 py-2"
                        placeholder="Порции"
                        onChange={(e) => setServings(+e.target.value)}
                    />
                </div>
            </div>

            <select
                className="w-full border rounded-lg px-4 py-2"
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
            >
                <option value="">Выберите категорию</option>
                {category.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>

            <select
                className="w-full border rounded-lg px-4 py-2"
                value={countryId}
                onChange={(e) =>
                    setCountryId(e.target.value ? Number(e.target.value) : undefined)
                }
            >
                <option value="">Выберите страну (необязательно)</option>

                {countries.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>

            <div className="bg-white rounded-xl p-6 space-y-4">
                <h2 className="font-semibold">Ингредиенты *</h2>

                {ingredients.map((ing, index) => (
                    <div key={index} className="grid grid-cols-3 gap-3">
                        <input
                            className="border rounded-lg px-3 py-2"
                            placeholder="Название"
                            value={ing.name}
                            onChange={(e) => {
                                const copy = [...ingredients];
                                copy[index].name = e.target.value;
                                setIngredients(copy);
                            }}
                        />
                        <input
                            type="number"
                            className="border rounded-lg px-3 py-2"
                            placeholder="Кол-во"
                            onChange={(e) => {
                                const copy = [...ingredients];
                                copy[index].amount = +e.target.value;
                                setIngredients(copy);
                            }}
                        />
                        <input
                            className="border rounded-lg px-3 py-2"
                            placeholder="Ед."
                            value={ing.unit}
                            onChange={(e) => {
                                const copy = [...ingredients];
                                copy[index].unit = e.target.value;
                                setIngredients(copy);
                            }}
                        />
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl p-6 space-y-4">
                <h2 className="font-semibold">Шаги приготовления *</h2>

                {instructions.map((step, index) => (
                    <textarea
                        key={index}
                        className="w-full border rounded-lg px-4 py-2"
                        placeholder={`Шаг ${index + 1}`}
                        onChange={(e) => {
                            const copy = [...instructions];
                            copy[index].description = e.target.value;
                            setInstructions(copy);
                        }}
                    />
                ))}
            </div>

            <div className="bg-white rounded-xl p-6 space-y-4">
                <h2 className="font-semibold">
                    Изображение блюда <span className="text-red-500">*</span>
                </h2>

                <input type="file" accept="image/*" onChange={handleImageChange} />

                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="preview"
                        className="h-40 rounded-xl object-cover"
                    />
                )}
            </div>

            <div className="bg-white rounded-xl p-6 space-y-4">
                <h2 className="font-semibold">Видео (необязательно)</h2>
                <input type="file" accept="video/*" onChange={handleVideoChange} />
            </div>

            <div className="flex justify-end">
                <button
                    disabled={loading}
                    onClick={handleSubmit}
                    className="rounded-xl bg-orange-500 px-6 py-3 text-white hover:bg-orange-600 disabled:opacity-50"
                >
                    {loading ? "Сохранение..." : "Опубликовать рецепт"}
                </button>
            </div>
        </div>
    );
}
