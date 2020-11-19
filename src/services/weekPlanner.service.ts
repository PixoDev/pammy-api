import { PammyRecipeDoc } from "@interfaces/recipe";
import { PammyUser } from "@interfaces/user";
import { WeekPlan, WeekPlanDayConfig } from "@interfaces/weekPlan";
import { RecipeModel } from "@models/recipe.model";
import { WeekPlanModel } from "@models/weekplan.model";

export const getCurrentWeekPlan = async (user: PammyUser) => {
  const today = new Date();
  const weekPlan = await WeekPlanModel.findOne({
    user: user._id,
    startingDate: { $lte: today },
  })
    .lean()
    .exec();

  if (!weekPlan) {
    throw new Error("Week Plan not found");
  }
  const recipeIds: string[] = [];
  weekPlan.days.forEach(day => {
    if (day.dinner) {
      recipeIds.push(day.dinner);
    }
    if (day.lunch) {
      recipeIds.push(day.lunch);
    }
  });

  const recipes = await RecipeModel.find({ _id: recipeIds }).lean().exec();

  const getRecipe = (recipeId: string) => {
    const match = recipes.find(rec => rec._id.toString() === recipeId);
    if (!match) {
      throw new Error("Recipe not found");
    }

    return match;
  };

  return fillDays(
    weekPlan.days.map(day => {
      const formatted: FormattedDay = {
        lunch: getRecipe(day.lunch),
        dinner: getRecipe(day.dinner),
        date: day.date,
      };
      return formatted;
    }),
    weekPlan.startingDate
  );
};

interface FormattedDay {
  lunch: Pick<PammyRecipeDoc, "_id">;
  dinner: Pick<PammyRecipeDoc, "_id">;
  date: Date;
}

const fillDays = (days: FormattedDay[], startingDate: Date) => {
  const DURATION = 7;
  const filledDays: any[] = [];
  const dates: any[] = [];
  const finishDate = new Date(
    new Date(startingDate).setDate(startingDate.getDate() + DURATION)
  );

  /*  for(let i = 0; i < DURATION; i++) {
    const toMatchDate = 
    const match = days.find()
  } */
  return {
    dates: dates,
    filledDays: filledDays,
    startingDate: startingDate,
    finishDate: finishDate.toISOString(),
  };
};

interface DayPlan {
  lunch: string;
  dinner: string;
}
export const createNewPlan = (user: PammyUser, payload: DayPlan[]) => {
  const startingDate = new Date();
  const weekPlan: WeekPlan = {
    startingDate: startingDate,
    user: user._id,
    days: [],
  };

  payload.forEach((dayConfig, i) => {
    const day: WeekPlanDayConfig = {
      date: new Date(
        new Date(startingDate).setDate(startingDate.getDate() + i)
      ),
      lunch: dayConfig.lunch,
      dinner: dayConfig.dinner,
    };
    weekPlan.days.push(day);
  });

  return new WeekPlanModel(weekPlan).save();
};
