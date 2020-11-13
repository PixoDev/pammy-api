import { RouteHandler } from "@interfaces/server";
import {
  createNewUser,
  getUserByToken,
  loginUser,
} from "@services/auth.service";

export const authUser: RouteHandler = async (req, reply) => {
  reply.send(await loginUser(req.body as any));
};

export const createUser: RouteHandler = async (req, reply) => {
  reply.send(await createNewUser(req.body as any));
};

export const getUser: RouteHandler = async (req, reply) => {
  console.log("USER", req.user);
  reply.send(await getUserByToken(req.user));
};
