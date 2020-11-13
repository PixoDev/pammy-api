import { Document } from "mongoose";

export interface WeekPlan {
  startingDate: Date;
  days: WeekPlanDayConfig[];
  user: String;
}

export interface WeekPlanDayConfig {
  date: Date;
  lunch: string;
  dinner: string;
}

export interface WeekPlanDoc extends WeekPlan, Document {}
