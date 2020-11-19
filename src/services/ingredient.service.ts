import { NewIngredientPayload } from "@interfaces/ingredient";
import { IngredientModel } from "@models/ingredient.model";

export const getIngredient = async (ingredientId: string) => {
  return IngredientModel.findById(ingredientId).lean().exec();
};

export const createIngredient = async (payload: NewIngredientPayload) => {
  const ingredient = new IngredientModel(payload);
  return ingredient.save();
};

export const updateIngredient = async (
  ingredientId: string,
  payload: Partial<NewIngredientPayload>
) => {
  return await IngredientModel.findByIdAndUpdate(
    ingredientId,
    { $set: payload },
    { new: true }
  )
    .lean()
    .exec();
};

export const getAll = async () => {
  return IngredientModel.find().lean().exec();
};
