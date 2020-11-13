import { FastifyInstance } from "fastify";
import { createUserRouter } from "./controllers/UserController";
import { createWeekPlanRouter } from "./controllers/WeekPlanner";
import { createRecipeRouter } from "./controllers/RecipeController";
import { createIngredientsRouter } from "./controllers/IngredientController";
import { ScriptController } from "./scripts/script.controller";
const apiVersion = "v1";

export const routerPath = (path: string) => "/" + apiVersion + path;
export default async function router(fastify: FastifyInstance) {
  // USER ROUTES
  createUserRouter(fastify);

  // WEEK PLANNER ROUTES
  createWeekPlanRouter(fastify);

  // RECIPE ROUTES
  createRecipeRouter(fastify);

  // INGREDIENT ROUTES
  createIngredientsRouter(fastify);

  fastify.get(routerPath("/script/:scriptId"), ScriptController);
}
