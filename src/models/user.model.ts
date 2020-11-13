import { PammyUserDoc } from "@interfaces/user";
import { model, Schema } from "mongoose";
import { genSalt, hash, compare } from "bcrypt";
const SALT_WORK_FACTOR = 10;
export const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre<PammyUserDoc>("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.passwordMatch = function (
  candidatePassword: string,
  cb: any
) {
  return new Promise((resolve, reject) => {
    compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) reject(err);
      else resolve(isMatch);
    });
  });
};
export const UserModel = model<PammyUserDoc>("User", userSchema);
