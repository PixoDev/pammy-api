import INGREDIENTS from "../assets/ingredients.json";

export const prepareCsvg = async () => {
  const result: any[] = [];

  INGREDIENTS.ingredients.forEach(ing => {
    result.push({
      name: ing.name,
      unit: ing.main_unit_es ? ing.main_unit_es : undefined,
      kcal_100gr: null,
      protein_100gr: null,
      carbs_100gr: null,
      fats_100gr: null,
      vitamins_100gr: null,
      minerals_100gr: null,
    });
  });

  console.log("gr", result.filter(r => r.unit === "mililitro").length);
  return result;
};
