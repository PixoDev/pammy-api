import { FastifySchema } from "fastify";

export const createIngredient: FastifySchema = {
  body: {
    type: "object",
    required: ["name", "image"],
    properties: {
      name: { type: "string" },
      image: { type: "string" },
    },
  },
};

export const updateIngredient = createIngredient;
