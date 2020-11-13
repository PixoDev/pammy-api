import { RouteHandler } from "@interfaces/server";
import { downloadIngredientImages } from "./downloadIngredientImages";
import { importIngredients } from "./importIngredients";
import { importRecipes } from "./importRecipes";

export const ScriptController: RouteHandler = async (req, reply) => {
  switch ((req.params as any).scriptId) {
    case "1": {
      return reply.send(await importIngredients());
    }
    case "2": {
      return reply.send(await downloadIngredientImages());
    }
    case "3": {
      return reply.send(await importRecipes());
    }

    default:
  }

  return reply.send({ error: "Script not found" });
};
