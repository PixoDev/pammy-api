import fastify from "fastify";
import router, { routerPath } from "./router";
import { config } from "dotenv";
import fastifyJWT from "fastify-jwt";
import { getEnv } from "@utils/env";
import { formatResponse } from "@utils/hooks/formatResponse";
import mongoose from "mongoose";
import { PammyError } from "@utils/errors/unauthorizedError";
const appRoot = require("app-root-path");

config({
  path: appRoot + "/.env",
});

export const server = fastify({
  logger: !!(process.env.NODE_ENV !== "development"),
});

mongoose
  .connect(`mongodb://localhost:27017/${getEnv("MONGO_DB")}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(done => {
    console.log("Mongoose connection ready");
  })
  .catch(err => console.log("Error connecting to MongoDB", err));

server.register(fastifyJWT, {
  secret: getEnv("JWT_SECRET"),
  sign: {
    expiresIn: "60 days",
  },
});
server.addHook("onRequest", async (request, reply) => {
  const publicRoutes = [routerPath("/user/auth"), routerPath("/user/create")];
  const isPublic = publicRoutes.indexOf(request.routerPath) !== -1;

  if (isPublic) {
    console.log("is PUBLIC");
    return;
  }
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});
server.addHook("preSerialization", (request, reply, payload: any, done) => {
  let err = payload.error;

  if ((payload as any).error && (payload as any).error.isCustomError) {
    err.message = payload.error.getError();
  }
  done(err, formatResponse(reply, payload));
});
server.setErrorHandler((error, request, reply) => {
  if ((error as any).isCustomError) {
    const err = (error as unknown) as PammyError;
    reply.statusCode = err.getStatusCode();
  }

  reply.send({ error: error });
});

server.register(router);

export default server;
