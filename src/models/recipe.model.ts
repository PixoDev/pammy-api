import { PammyRecipeDoc } from "@interfaces/recipe";
import { model, Schema } from "mongoose";

export const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
    text: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
});

export const RecipeModel = model<PammyRecipeDoc>("Recipe", recipeSchema);
