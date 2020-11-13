import { FastifyInstance } from "fastify";
import { routerPath } from "../../router";

import * as WeekPlannerController from "./weekPlanner.controller";
import * as WeekPlannerValidator from "./weekPlanner.validator";

export const createWeekPlanRouter = (fastify: FastifyInstance) => {
  fastify.post(
    routerPath("/weekplanner/new"),
    { schema: WeekPlannerValidator.createNewWeekPlan },
    WeekPlannerController.createWeekPlan
  );

  fastify.get(
    routerPath("/weekplanner/current"),
    WeekPlannerController.getCurrentWeekPlan
  );
};
