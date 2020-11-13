import { Document } from "mongoose";

export interface PammyUser {
  email: string;
  name: string;
  password: string;
  _id: any;
}

export interface PammyUserDoc extends PammyUser, Document {
  passwordMatch: (passwordToCompare: string) => Promise<boolean>;
}
