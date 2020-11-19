/* import { PammyIngredient } from "@interfaces/ingredient";
import { writeFile } from "fs";
import INGREDIENTS from "../assets/ingredients.json";
const appRoot = require("app-root-path");
const translate = require("translate");

export const sortIngredients = async () => {
  const result: PammyIngredient[] = [];
  const operations: any[] = [];

  const operation = async (ing: any) => {
    const newIng: PammyIngredient = {
      name: ing.name,
      pluralName: ing.plural_name,
      name_en: await translateIngredient(ing.name),
      image: ing.image,
      unit: ing.main_unit_es ? ing.main_unit_es : undefined,
    };

    console.log("123");
    result.push(newIng);
  };
  INGREDIENTS.ingredients.forEach(ing => {
    operations.push(operation(ing));
  });

  console.log("result", operations);
  await Promise.all(operations);
  writeFile(
    appRoot + "/src/assets/ingredients_en.json",
    JSON.stringify(result, null, 2),
    { encoding: "utf8" },
    err => {
      if (err) console.log(err);
    }
  );
  return result;
};

const translateIngredient = async (ingName: string) => {
  translate.engine = "google";
  translate.key = "AIzaSyD4PhK0Wo1FqzitJqDYIZIYLIBywRO00JY";
  return translate(ingName, { from: "es", to: "en" });
};
 */
