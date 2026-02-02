"use client";

import { ChefHat, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import google from "../../../../public/images/Без названия.jpg";
import { useState } from "react";
import { login } from "@/src/services/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login({ username, password });

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      toast.success("Вы успешно вошли 🎉");
      router.push("/home");
    } catch {
      toast.error("Неверный логин или пароль ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      
      <div className="hidden lg:flex flex-col justify-between left text-white p-10">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center">
          <Link href={'/guest'}>
            <ChefHat />
          </Link>
          </div>
          <span className="text-lg font-semibold">CookSnap</span>
        </div>

        <div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Вдохновение <br /> для вашего <br /> следующего шедевра
          </h1>
          <p className="text-sm opacity-90 max-w-sm">
            Тысячи рецептов, советы шеф-поваров и кулинарное сообщество
            в одном месте.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm space-y-6">

          <div className="flex justify-center items-center gap-2 lg:hidden">
            <div className="bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center text-white">
              <ChefHat />
            </div>
            <span className="text-lg font-semibold">CookSnap</span>
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-2xl font-semibold text-gray-900">
              Вход в аккаунт
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Рады видеть вас снова 👋
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-full border border-gray-200 px-4 py-3 text-sm
              focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-full border border-gray-200 px-4 py-3 pr-12 text-sm
                focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="text-right">
              <button
                type="button"
                className="text-xs text-orange-500 hover:underline"
              >
                Забыли пароль?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer active:scale-[90%] transition w-full rounded-full bg-orange-500 py-3 text-white font-medium
              hover:bg-orange-600 active:scale-[0.98] transition"
            >
              {loading ? "Входим..." : "Войти"}
            </button>
          </form>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">или</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button className="w-full rounded-full border py-3 flex items-center justify-center gap-2 text-sm hover:bg-gray-50 transition">
            <Image src={google} alt="Google" className="w-5 h-5" />
            Войти через Google
          </button>

          <p className="text-center text-sm text-gray-500">
            Нет аккаунта?{" "}
            <Link
              href="/register"
              className="text-orange-500 font-medium hover:underline"
            >
              Зарегистрироваться
            </Link>
          </p>

          <p className="text-center text-xs text-gray-300">
            © 2024 CookSnap
          </p>
        </div>
      </div>
    </div>
  );
}
