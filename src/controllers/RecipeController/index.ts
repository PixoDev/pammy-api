import { FastifyInstance } from "fastify";
import { routerPath } from "src/router";

import * as RecipeController from "./recipe.controller";
import * as RecipeValidator from "./recipe.validator";

export const createRecipeRouter = (fastify: FastifyInstance) => {
  fastify.get(routerPath("/recipes/:recipeId"), RecipeController.getRecipe);
  fastify.get(routerPath("/recipes"), RecipeController.getRecipes);
  fastify.post(
    routerPath("/recipes/new"),
    { schema: RecipeValidator.createRecipe },
    RecipeController.createRecipe
  );

  fastify.post(
    routerPath("/recipes/:recipeId/update"),
    { schema: RecipeValidator.updateRecipe },
    RecipeController.updateRecipe
  );
};
