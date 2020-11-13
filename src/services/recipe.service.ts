import { NewRecipePayload } from "@interfaces/recipe";
import { RecipeModel } from "@models/recipe.model";

export const getRecipe = async (recipeId: string) => {
  return RecipeModel.findById(recipeId).lean().exec();
};

export const getRecipes = async () => {
  return RecipeModel.find({}).lean().exec();
};

export const createRecipe = async (payload: NewRecipePayload) => {
  const recipe = new RecipeModel(payload);
  return recipe.save();
};

export const updateRecipe = async (
  recipeId: string,
  payload: Partial<NewRecipePayload>
) => {
  return await RecipeModel.findByIdAndUpdate(
    recipeId,
    { $set: payload },
    { new: true }
  )
    .lean()
    .exec();
};
