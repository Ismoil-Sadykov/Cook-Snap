"use client";

import { RegisterUser } from "@/src/api/api";
import { AppDispatch } from "@/src/utils/store";
import {
  ChefHat,
  User,
  Mail,
  Lock,
  ShieldCheck,
  EyeOff,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullname || !email || !password || !password2) {
      toast.error("Заполните все поля");
      return;
    }

    if (password !== password2) {
      toast.error("Пароли не совпадают");
      return;
    }

    if (!username) {
      toast.error("Введите имя пользователя");
      return;
    }

    const usernameRegex = /^[\w.@+-]+$/;
    if (!usernameRegex.test(username)) {
      toast.error("Username содержит недопустимые символы");
      return;
    }

    try {
      await dispatch(
        RegisterUser({
          username: email.split("@")[0],
          email,
          fullname,
          password,
          password2,
        })
      ).unwrap();

      router.push("/authorization");
    } catch {
    }
  };


  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      <div
        className="relative hidden lg:flex flex-col justify-between bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/auth-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 p-10 flex flex-col h-full justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center">
              <Link href={'/guest'}>
                <ChefHat className="w-5 h-5" />
              </Link>
            </div>
            <span className="text-lg font-semibold">CookSnap</span>
          </div>

          <div>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Вдохновение <br />
              для ваших <br />
              шедевров
            </h1>
            <p className="text-sm opacity-90 max-w-sm">
              Присоединяйтесь к крупнейшему сообществу кулинаров
              и делитесь своими рецептами.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm space-y-6">

          <div className="flex items-center justify-center gap-2 lg:hidden">
            <div className="bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold">CookSnap</span>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-semibold text-gray-900">
              Создать аккаунт
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Начните кулинарное путешествие сегодня
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              icon={<User size={16} />}
              placeholder="Имя пользователя (для входа)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              icon={<Mail size={16} />}
              placeholder="example@mail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            <Input
              icon={<User size={16} />}
              placeholder="Ваше имя"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <div className="relative">
              <Input
                icon={<Lock size={16} />}
                placeholder="Минимум 8 символов"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="relative">
              <Input
                icon={<ShieldCheck size={16} />}
                placeholder="Повторите пароль"
                type={showPassword ? "text" : "password"}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <label className="flex items-start gap-2 text-xs text-gray-500">
              <input
                type="checkbox"
                className="mt-1 accent-orange-500"
              />
              <span>
                Я согласен с{" "}
                <span className="text-orange-500 cursor-pointer">
                  условиями
                </span>{" "}
                и{" "}
                <span className="text-orange-500 cursor-pointer">
                  политикой конфиденциальности
                </span>
              </span>
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-orange-500 py-3 text-white font-medium hover:bg-orange-600 active:scale-[0.98] transition"
            >
              Создать аккаунт
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Уже есть аккаунт?{" "}
            <Link
              href="/authorization"
              className="text-orange-500 hover:underline"
            >
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Input({
  icon,
  ...props
}: {
  icon: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <input
        {...props}
        className="w-full rounded-full border border-gray-200 pl-11 pr-4 py-3 text-sm
        focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>
  );
}
