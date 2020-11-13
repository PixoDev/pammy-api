import { RouteHandler } from "@interfaces/server";
import { getUserByToken } from "@services/auth.service";
import * as WeekPlannerApi from "@services/weekPlanner.service";
export const createWeekPlan: RouteHandler = async (req, reply) => {
  const user = await getUserByToken(req.user);
  user;
  console.log("body", req.body);
  reply.send(await WeekPlannerApi.createNewPlan(user, req.body as any));
};

export const getCurrentWeekPlan: RouteHandler = async (req, reply) => {
  const user = await getUserByToken(req.user);
  reply.send(await WeekPlannerApi.getCurrentWeekPlan(user));
};
