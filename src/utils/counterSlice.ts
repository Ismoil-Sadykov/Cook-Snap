import { createSlice } from "@reduxjs/toolkit";
import { Category, Country, Recipe, UserProfile } from "../types/userType";
import {
  AddRecipe,
  EditProfile,
  GetCategory,
  GetCountry,
  GetMyRecipes,
  GetProfile,
  GetRecipeById,
  GetRecipes,
} from "../api/api";

export interface CounterState {
  data: UserProfile | null;
  loading: boolean;
  error: string | null;
  category: Category[];
  recipes: Recipe[];
  countries: Country[];
  recipeDetail: Recipe | null;
  loadingRecipeDetail: boolean;
  search: string;
}

const initialState: CounterState = {
  data: null,
  loading: false,
  error: null,
  category: [],
  recipes: [],
  countries: [],
  recipeDetail: null,
  loadingRecipeDetail: false,
  search: "",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Profile
    builder
      .addCase(GetProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetProfile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(EditProfile.fulfilled, (state, action) => {
        state.data = action.payload;
      });

    // Category
    builder
      .addCase(GetCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(GetCategory.rejected, (state) => {
        state.loading = false;
      });

    // Recipes
    builder

      // Get
      .addCase(GetRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(GetRecipes.rejected, (state) => {
        state.loading = false;
      })

      //Get My Recipes
      .addCase(GetMyRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetMyRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload.results;
      })
      .addCase(GetMyRecipes.rejected, (state) => {
        state.loading = false;
      })

      //Add
      .addCase(AddRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddRecipe.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(AddRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //Get By Id
      .addCase(GetRecipeById.pending, (state) => {
        state.loadingRecipeDetail = true;
      })
      .addCase(GetRecipeById.fulfilled, (state, action) => {
        state.loadingRecipeDetail = false;
        state.recipeDetail = action.payload;
      })
      .addCase(GetRecipeById.rejected, (state) => {
        state.loadingRecipeDetail = false;
      });

    // Country
    builder
      .addCase(GetCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(GetCountry.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSearch } = counterSlice.actions;
export default counterSlice.reducer;
