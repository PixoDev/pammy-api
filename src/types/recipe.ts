import { Document } from "mongoose";

export interface PammyRecipe {
  name: string;
  image: string;
  description: string;
  cookingTime: number;
  steps?: { _id: string; qty: number };
  level?: number;
}

export interface NewRecipePayload extends PammyRecipe {}

export interface PammyRecipeDoc extends Document, PammyRecipe {}
