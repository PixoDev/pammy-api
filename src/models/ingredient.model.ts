import { PammyIngredientDoc } from "@interfaces/ingredient";
import { Schema, model } from "mongoose";

export const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
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
});

export const IngredientModel = model<PammyIngredientDoc>(
  "Ingredient",
  ingredientSchema
);
