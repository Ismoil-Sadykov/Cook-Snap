'use client'

import { GetProfile } from "@/src/api/api";
import { AppDispatch, RootState } from "@/src/utils/store";
import { ChefHat, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicMenu from "./DropDownMenu";
import { setSearch } from "@/src/utils/counterSlice";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const [query, setQuery] = useState("");
  const { data: user } = useSelector((state: RootState) => state.counter);

  const [isClient, setIsClient] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(setSearch(query));
    }, 500); // debounce

    return () => clearTimeout(delay);
  }, [query, dispatch]);

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem("access");
    setIsAuth(!!token);

    if (token && !user) {
      dispatch(GetProfile());
    }
  }, [dispatch, user]);

  if (!isClient || window.location.pathname == "/") {
    return null;
  }

  return (
    <header>
      <div className="p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {localStorage.getItem("access") ? (
            <Link href="/home">
              <div className="bg-[#FF7B00] text-white w-10 h-10 rounded-full p-2">
                <ChefHat />
              </div>
            </Link>
          ) : (
            <Link href="/guest">
              <div className="bg-[#FF7B00] text-white w-10 h-10 rounded-full p-2">
                <ChefHat />
              </div>
            </Link>
          )}
          <p className="text-[20px] font-bold">CookSnap</p>
        </div>
        <div className="hidden bg-[#F4EDE6] w-[550px] md:flex items-center h-[50px] p-3 gap-2 rounded-[16px]">
          <Search color="grey" />
          <input
            type="search"
            placeholder="Поиск рецептов..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full outline-none placeholder:text-[#B79170]"
          />
        </div>
        {isAuth ? (
          <div className="flex gap-3 items-center">
            <p className="font-semibold">
              {user ? `Hello, ${user.username}` : "Загрузка..."}
            </p>
            <BasicMenu />
          </div>
        ) : (
          <Link href="/authorization">
            <button className="cursor-pointer text-[18px] font-semibold text-[#FF7B00] hover:underline">
              Войти
            </button>
          </Link>
        )}
      </div>
      <div className="md:hidden bg-[#F4EDE6] w-[300px] mx-auto flex items-center h-[50px] p-3 gap-2 rounded-[16px]">
        <Search color="grey" />
        <input
          type="search"
          placeholder="Поиск рецептов..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full outline-none placeholder:text-[#B79170]"
        />
      </div>
    </header>
  );
}
