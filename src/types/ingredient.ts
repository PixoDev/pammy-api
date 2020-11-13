import { Document } from "mongoose";

export interface PammyIngredient {
  name: string;
  pluralName: string;
  image: string;
  unit?: string;
}

export interface NewIngredientPayload extends PammyIngredient {}
export interface PammyIngredientDoc extends Document, PammyIngredient {}
