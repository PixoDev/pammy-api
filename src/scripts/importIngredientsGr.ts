import { PammyIngredient } from "@interfaces/ingredient";
import { IngredientModel } from "@models/ingredient.model";
import INGREDIENTS_GR from "../assets/ingredients_source/ingredients_gr.json";
import INGREDIENTS from "../assets/ingredients_en.json";
export const importIngredientsGr = async () => {
  const errors: any[] = [];

  const ingredients: (PammyIngredient | null)[] = INGREDIENTS_GR.filter(
    ing => !!ing.name
  ).map<PammyIngredient | null>(ing => {
    const match = findIngredient(ing.name);
    if (match) {
      return {
        name_en: match.name_en,
        name: match.name,
        pluralName: match.pluralName,
        image: match.image,
        unit: match.unit,
        nutritionalInfo: {
          kcal: ing["kcal_100gr/ml"] as number,
          carb: ing["carbs_100gr/ml"] as number,
          proteins: ing["protein_100gr/ml"] as number,
          fat: ing["fats_100gr/ml"] as number,
          minerals: ing["minerals_100gr/ml"] as number,
        },
      };
    } else {
      errors.push(ing);
      return null;
    }
  });

  /*  const filtered = ingredients.filter(ing => {
    if (!ing) {
      return false;
    }
    return true;
  }); */
  console.log("ERRORS", errors);
  await IngredientModel.insertMany(ingredients);

  return ingredients;
};

const findIngredient = (name: string) => {
  return INGREDIENTS.find(ing => ing.name === name);
};
