import { FastifyInstance } from "fastify/types/instance";
import { routerPath } from "../../router";

import * as IngredientController from "./ingredient.controller";
import * as IngredientValidator from "./ingredient.validator";

export const createIngredientsRouter = (fastify: FastifyInstance) => {
  fastify.get(
    routerPath("/ingredients/:ingredientId"),
    IngredientController.getIngredient
  );

  //fastify.get(routerPath("/ingredients"),IngredientController.getAll)
  fastify.post(
    routerPath("/ingredients/new"),
    { schema: IngredientValidator.createIngredient },
    IngredientController.createIngredient
  );

  fastify.post(
    routerPath("/ingredients/:ingredientId/update"),
    { schema: IngredientValidator.updateIngredient },
    IngredientController.updateIngredient
  );
};
