import { RouteHandler } from "@interfaces/server";
import { getUserByToken } from "@services/auth.service";

export const createIngredient: RouteHandler = async (req, reply) => {
  reply.send(await getUserByToken(req.user));
};

export const updateIngredient: RouteHandler = async (req, reply) => {
  reply.send(await getUserByToken(req.user));
};

export const getIngredient: RouteHandler = async (req, reply) => {
  reply.send(await getUserByToken(req.user));
};
