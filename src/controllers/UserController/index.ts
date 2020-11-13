import { FastifyInstance } from "fastify";
import { routerPath } from "../../router";

import * as UserController from "./user.controller";
import * as UserValidator from "./user.validator";

export const createUserRouter = (fastify: FastifyInstance) => {
  fastify.post(
    routerPath("/user/auth"),
    { schema: UserValidator.login },
    UserController.authUser
  );
  fastify.post(
    routerPath("/user/create"),
    { schema: UserValidator.register },
    UserController.createUser
  );
  fastify.get(routerPath("/user/me"), UserController.getUser);
};
