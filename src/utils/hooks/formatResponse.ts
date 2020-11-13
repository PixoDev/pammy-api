import { FastifyReply } from "fastify";

export const formatResponse = (reply: FastifyReply, payload: any) => {
  let isValid = true;
  if (reply.statusCode >= 200 && reply.statusCode < 300) {
    isValid = true;
  } else {
    isValid = false;
  }
  return {
    status: isValid,
    result: payload,
  };
};
