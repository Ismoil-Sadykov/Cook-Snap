export interface UserProfile {
  id: number;
  username: string;
  email: string;
  fullname: string;
  bio: string;
  avatar: string | null;
}

export interface Category {
  id: number;
  name: string;
}

export interface Country {
  id: number;
  name: string;
}

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
}

export interface Instruction {
  id: number;
  step_number: number;
  description: string;
}

export interface Recipe {
  id: number;
  title: string;
  image: string | null;
  description: string;
  country: Country;
  category: Category;
  author: string;
  status: string;
  prep_time: number;
  cook_time: number;
  total_time: number;
  servings: number;
  ingredients: Ingredient[];
  instructions: Instruction[];
  created_at: string;
  updated_at: string;
}

export interface RecipeResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Recipe[];
}

export interface CreateIngredient {
  name: string;
  amount: number;
  unit: string;
}

export interface CreateInstruction {
  step_number: number;
  description: string;
}

export interface CreateRecipePayload {
  title: string;
  description: string;
  country_id: number;
  category_id: number;
  prep_time: number;
  cook_time: number;
  servings: number;
  ingredients: CreateIngredient[];
  instructions: CreateInstruction[];
}
