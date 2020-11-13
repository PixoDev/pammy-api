import { PammyRecipe } from "@interfaces/recipe";
import { RecipeModel } from "@models/recipe.model";
import DATA from "../assets/recipes.json";
export const importRecipes = () => {
  const recipes = DATA.recipes;
  const formattedRecipes: Promise<void>[] = [];
  recipes.forEach((recipe, i) => {
    formattedRecipes.push(buildRecipe(recipe as any));
  });
};

const buildRecipe = async (recipe: Recipe) => {
  const newRecipe: PammyRecipe = {
    name: recipe.name,
    description: recipe.description,
    image: recipe.images[0].url,
    cookingTime: recipe.total_time,
  };

  const recipeDoc = new RecipeModel(newRecipe);
  await recipeDoc.save();
};

export interface Image {
  url: string;
  width: number;
}

export interface NutritionalBalance {
  id: number;
  proteins: number;
  veg_and_fruits: number;
  grains: number;
  total_weight_in_grams: number;
  recipe_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface Author {
  id: number;
  first_name: string;
  last_name: string;
  image: string;
  website: string;
  website_name: string;
  description: string;
  facebook: string;
  twitter: string;
  pinterest: string;
  youtube: string;
  instagram: string;
  name: string;
  current_folders_amount: number;
  available_folders_amount: number;
  has_premium: boolean;
  revenue_premium: boolean;
  email: string;
}

export interface Recipe {
  id: string;
  name: string;
  type: string;
  rate: string;
  description: string;
  files: string[];
  image_title: string;
  image_alt_tag: string;
  images: Image[];
  premium: boolean;
  total_time: number;
  dificulty?: any;
  like_count: number;
  new: boolean;
  liked?: any;
  favorited?: any;
  object_id: number;
  in_cart: boolean;
  portions_added?: any;
  portion: number;
  ingredients_amount: number;
  nutritional_balance: NutritionalBalance;
  author: Author;
}
