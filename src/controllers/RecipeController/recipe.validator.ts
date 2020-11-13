import { FastifySchema } from "fastify";

export const createRecipe: FastifySchema = {
  body: {
    type: "object",
    required: ["name", "image"],
    properties: {
      name: { type: "string" },
      image: { type: "string" },
    },
  },
};

export const updateRecipe = createRecipe;
