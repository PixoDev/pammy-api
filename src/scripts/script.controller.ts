import { RouteHandler } from "@interfaces/server";
import { downloadIngredientImages } from "./downloadIngredientImages";
import { downloadRecipesImages } from "./downloadRecipesImages";
import { importIngredients } from "./importIngredients";
import { importIngredientsGr } from "./importIngredientsGr";
import { importRecipes } from "./importRecipes";
import { prepareCsvg } from "./prepareCsv";

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

    case "4": {
      return reply.send(false);
    }
    case "5": {
      return reply.send(await prepareCsvg());
    }

    case "6": {
      return reply.send(await downloadRecipesImages());
    }

    case "7": {
      return reply.send(await importIngredientsGr());
    }

    default:
  }

  return reply.send({ error: "Script not found" });
};
