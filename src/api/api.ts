import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosRequest from "../utils/axios";

export const GetProfile = createAsyncThunk(
  "counter/GetProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest("/api/users/profile/");
      return data;
    } catch (error) {
      toast.error("Ошибка загрузки данных ❌");
      return rejectWithValue("Ошибка загрузки профиля");
    }
  },
);

export const GetCategory = createAsyncThunk(
  "counter/GetCategory",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest("/api/recipes/categories/");
      return data.results;
    } catch (error) {
      toast.error("Ошибка загрузки данных ❌");
      return rejectWithValue("Ошибка загрузки профиля");
    }
  },
);

export const GetRecipes = createAsyncThunk(
  "counter/GetRecipes",
  async (search: string | undefined, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest(
        `/api/recipes/recipes/${search ? `?search=${search}` : ""}`,
      );
      return data.results;
    } catch (error) {
      toast.error("Ошибка загрузки данных ❌");
      return rejectWithValue("Ошибка загрузки рецептов");
    }
  },
);

export const GetCountry = createAsyncThunk(
  "counter/GetCountry",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest("/api/recipes/countries/");
      return data.results;
    } catch (error) {
      toast.error("Ошибка загрузки данных ❌");
      return rejectWithValue("Ошибка загрузки профиля");
    }
  },
);

export const EditProfile = createAsyncThunk(
  "counter/EditProfile",
  async (payload: { fullname: string; bio: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.patch("/api/users/profile/", payload);
      toast.success("Профиль успешно обновлен ✅");
      return data;
    } catch (error: any) {
      toast.error("Ошибка редактирования профиля ❌");
      return rejectWithValue(error.response?.data || "Ошибка редактирования");
    }
  },
);

export const GetMyRecipes = createAsyncThunk(
  "counter/GetMyRecipes",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest("/api/recipes/recipes/my_recipes/");
      return data;
    } catch (error) {
      toast.error("Ошибка загрузки данных ❌");
      return rejectWithValue("Ошибка загрузки профиля");
    }
  },
);

export const AddRecipe = createAsyncThunk(
  "recipes/AddRecipe",
  async (payload: FormData, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.post(
        "/api/recipes/recipes/",
        payload,
      );
      toast.success("Рецепт создан ✅");
      return data;
    } catch (error: any) {
      toast.error("Ошибка создания рецепта ❌");
      return rejectWithValue(error.response?.data);
    }
  },
);

export const DeleteRecipe = createAsyncThunk(
  "counter/DeleteRecipe",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.delete(`/api/recipes/recipes/${id}/`);
      toast.success("Рецепт успешно удалено ✅");
      return data;
    } catch (error) {
      toast.error("Ошибка загрузки данных ❌");
      return rejectWithValue("Ошибка загрузки профиля");
    }
  },
);

export const GetRecipeById = createAsyncThunk(
  "recipes/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get(`/api/recipes/recipes/${id}/`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Error");
    }
  },
);

export const EditRecipe = createAsyncThunk(
  "counter/EditRecipe",
  async (
    { id, payload }: { id: number; payload: FormData },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axiosRequest.put(
        `/api/recipes/recipes/${id}/`,
        payload, // ✅ уже FormData
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Ошибка обновления рецепта",
      );
    }
  },
);

export const RegisterUser = createAsyncThunk(
  "counter/RegisterUser",
  async (
    payload: {
      username: string;
      email: string;
      fullname: string;
      password: string;
      password2: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axiosRequest.post("/api/users/register/", payload);
      toast.success("Аккаунт создан ✅");
      return data;
    } catch (error: any) {
      const errors = error.response?.data;

      if (errors?.password?.[0]) {
        toast.error(errors.password[0]);
      } else if (errors?.email?.[0]) {
        toast.error(errors.email[0]);
      } else if (errors?.username?.[0]) {
        toast.error(errors.username[0]);
      } else {
        toast.error("Ошибка регистрации ❌");
      }

      return rejectWithValue(errors);
    }
  },
);
