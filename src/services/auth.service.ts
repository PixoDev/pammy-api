import { PammyUser } from "@interfaces/user";
import { UserModel } from "@models/user.model";
import { UnauthorizedError } from "@utils/errors/unauthorizedError";
import server from "../app";

interface JWTPayload {
  email: string;
  _id: string;
}

export const signToken = (payload: JWTPayload) => {
  const token = server.jwt.sign({ payload });
  return token;
};

const sanitizeUser = (user: PammyUser) => {
  //@ts-ignore;
  delete user.password;

  return user;
};

interface LoginUserParams {
  email: string;
  password: string;
}
export const loginUser = async (params: LoginUserParams) => {
  const user = await UserModel.findOne({ email: params.email });

  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }
  const match = await user.passwordMatch(params.password);
  if (!match) {
    throw new UnauthorizedError("Invalid credentials");
  }

  return {
    ...sanitizeUser(user.toJSON()),
    token: signToken({ email: user.email, _id: user._id }),
  };
};

interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}
export const createNewUser = async (params: CreateUserParams) => {
  const doc = new UserModel(params);
  const user = await doc.save();

  return {
    ...sanitizeUser(user),
    token: signToken({ email: user.email, _id: user._id }),
  };
};

export const getUserByToken = async ({ payload }: any) => {
  const { _id } = payload;
  const user = await UserModel.findById(_id).lean().exec();
  if (!user) {
    throw new Error("User not found, invalid token");
  }
  return sanitizeUser(user);
};
