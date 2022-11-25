import { model, Schema, Types } from "mongoose";

interface UserSchema {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<UserSchema>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = model<UserSchema>("User", userSchema);
