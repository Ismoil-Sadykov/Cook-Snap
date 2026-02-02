'use client'

import { User, Mail, Info, LibraryBig } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/src/utils/store"
import { useEffect, useState } from "react"
import { EditProfile } from "@/src/api/api"
import Link from "next/link"

export default function ProfilePage() {
  const { data } = useSelector((state: RootState) => state.counter)
  const dispatch = useDispatch<AppDispatch>()

  const [fullname, setFullname] = useState("")
  const [bio, setBio] = useState("")

  useEffect(() => {
    if (data) {
      setFullname(data.fullname || "")
      setBio(data.bio || "")
    }
  }, [data])

  const handleSave = () => {
    dispatch(EditProfile({ fullname, bio }))
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] px-4 py-6 sm:px-6 sm:py-10 pb-32 sm:pb-10">
      <div className="mx-auto max-w-5xl space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Профиль</h1>
          <p className="mt-1 text-sm text-gray-500">
            Управляйте данными аккаунта
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          
          {/* Main info */}
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm space-y-6">
              <h2 className="text-xl font-semibold">Основные данные</h2>

              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                
                {/* Avatar */}
                <img
                  src={data?.avatar || "/images/userfoto.png"}
                  alt="avatar"
                  className="h-24 w-24 rounded-full object-cover border-2 border-orange-300"
                />

                {/* Form */}
                <div className="flex-1 w-full space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    
                    <div className="flex items-center gap-2 rounded-xl border bg-gray-50 px-4 py-3">
                      <User size={18} className="text-gray-400" />
                      <input
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        placeholder="Full name"
                        className="w-full bg-transparent outline-none text-base sm:text-sm"
                      />
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border bg-gray-50 px-4 py-3">
                      <User size={18} className="text-gray-400" />
                      <input
                        value={data?.username || ""}
                        readOnly
                        className="w-full bg-transparent outline-none text-base sm:text-sm"
                      />
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border bg-gray-50 px-4 py-3 sm:col-span-2">
                      <Mail size={18} className="text-gray-400" />
                      <input
                        value={data?.email || ""}
                        readOnly
                        className="w-full bg-transparent outline-none text-base sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 flex items-center gap-1 text-sm text-gray-600">
                      <Info size={16} /> О себе
                    </label>
                    <textarea
                      rows={4}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full rounded-xl border bg-gray-50 px-4 py-3 text-base sm:text-sm resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Stats */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Статистика</h2>
              <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-col sm:gap-3">
                {[
                  { label: "Рецептов", value: "24" },
                  { label: "Лайков", value: "1.2K" },
                  { label: "Подписчиков", value: "842" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center justify-center rounded-xl bg-gray-50 px-3 py-2"
                  >
                    <span className="text-xs text-gray-500">{item.label}</span>
                    <span className="font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="rounded-2xl bg-white p-6 shadow-sm text-2xl flex justify-center gap-3">
              🏅 ⭐ 🥈
            </div>

            {/* Status */}
            <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm">
              🔒 <b>Мастер-шеф</b>
              <p className="mt-1 text-gray-600">
                Аккаунт подтверждён. Публикации без модерации.
              </p>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-4 sm:static sm:border-0 sm:bg-transparent sm:p-0 space-y-3">
          <button
            onClick={handleSave}
            className="w-full rounded-xl bg-orange-500 py-4 text-lg sm:text-base font-semibold text-white active:scale-95 transition"
          >
            Сохранить изменения
          </button>

          <Link href="/myRecipes">
            <button className="w-full rounded-xl border py-3 text-sm flex items-center justify-center gap-2 active:scale-95 transition cursor-pointer">
              <LibraryBig size={18} />
              Мои рецепты
            </button>
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400 mt-10">
          © 2024 CookSnap. Приятного аппетита!
        </p>
      </div>
    </div>
  )
}
