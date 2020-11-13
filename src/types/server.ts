import { RouteHandlerMethod } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server, IncomingMessage, ServerResponse } from "http";

export type RouteHandler = RouteHandlerMethod<
  Server,
  IncomingMessage,
  ServerResponse,
  RouteGenericInterface,
  unknown
>;
