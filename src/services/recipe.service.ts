import { NewRecipePayload } from "@interfaces/recipe";
import { RecipeModel } from "@models/recipe.model";

export const getRecipe = async (recipeId: string) => {
  return RecipeModel.findById(recipeId).lean().exec();
};

interface RecipesParams {
  params: any;
}
export const getRecipes = async ({ params }: RecipesParams) => {
  const query = buildQuery(params);
  const count = parseInt(params.count) || 20;
  const page = parseInt(params.page);

  console.log("PARAMS", query);
  return RecipeModel.find(query)
    .limit(count)
    .skip((page - 1) * count)
    .lean()
    .exec();
};

const FILTERS = ["cookingTime"];

const buildQuery = (filters: { [key: string]: any }) => {
  const init: any = {};
  Object.keys(filters).forEach((key: string) => {
    if (FILTERS.includes(key)) {
      init[key] = { $lte: filters[key] };
    }
    if (key === "query") {
      init["$text"] = {
        $search: filters[key],
      };
    }
  });
  return init;
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
