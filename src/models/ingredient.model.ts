import { PammyIngredientDoc } from "@interfaces/ingredient";
import { Schema, model } from "mongoose";

export const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
    text: true,
  },
  name_en: {
    type: String,
    required: true,
    text: true,
  },
  pluralName: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  nutritionalInfo: {
    kcal: Number,
    proteins: Number,
    carb: Number,
    fat: Number,
    minerals: Number,
  },
});

export const IngredientModel = model<PammyIngredientDoc>(
  "Ingredient",
  ingredientSchema
);
