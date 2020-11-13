import { FastifySchema } from "fastify";

export const login: FastifySchema = {
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string" },
      password: { type: "string" },
    },
  },
};

export const register: FastifySchema = {
  body: {
    type: "object",
    required: ["email", "password", "name"],
    properties: {
      email: { type: "string" },
      password: { type: "string" },
      name: { type: "string" },
    },
  },
};
