import { Document } from "mongoose";

export interface PammyIngredient {
  name: string;
  name_en: string;
  pluralName: string;
  image: string;
  unit?: string;
  nutritionalInfo: {
    kcal: number;
    proteins: number;
    carb: number;
    fat: number;
    minerals: number;
  };
}

export interface NewIngredientPayload extends PammyIngredient {}
export interface PammyIngredientDoc extends Document, PammyIngredient {}
