import { PammyIngredient } from "@interfaces/ingredient";
import { IngredientModel } from "@models/ingredient.model";
import INGREDIENTS from "../assets/ingredients.json";

export const importIngredients = async () => {
  const ingredients: PammyIngredient[] = INGREDIENTS.ingredients.map<
    PammyIngredient
  >(ing => {
    return {
      name: ing.name,
      pluralName: ing.plural_name,
      image: ing.image,
      unit: ing.main_unit_es ? ing.main_unit_es : undefined,
    };
  });
  await IngredientModel.insertMany(ingredients);
};
