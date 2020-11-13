import { model, Schema } from "mongoose";
import { WeekPlanDoc } from "@interfaces/weekPlan";

const dayPlanSchema = new Schema({
  date: Schema.Types.Date,
  lunch: { type: String, required: true },
  dinner: { type: String, required: true },
});

export const weekPlanSchema = new Schema({
  startingDate: Schema.Types.Date,
  user: { type: String, required: true },
  days: [dayPlanSchema],
});

export const WeekPlanModel = model<WeekPlanDoc>("WeekPlan", weekPlanSchema);
