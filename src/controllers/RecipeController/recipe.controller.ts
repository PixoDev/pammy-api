import { RouteHandler } from "@interfaces/server";
import * as RecipeApi from "@services/recipe.service";

export const getRecipe: RouteHandler = async (req, reply) => {
  reply.send(await RecipeApi.getRecipe((req.params as any).recipeId));
};

export const createRecipe: RouteHandler = async (req, reply) => {
  reply.send(await RecipeApi.createRecipe(req.body as any));
};

export const updateRecipe: RouteHandler = async (req, reply) => {
  reply.send(
    await RecipeApi.updateRecipe((req.params as any).recipeId, req.body as any)
  );
};

export const getRecipes: RouteHandler = async (req, reply) => {
  reply.send(await RecipeApi.getRecipes({ params: req.query as any }));
};
