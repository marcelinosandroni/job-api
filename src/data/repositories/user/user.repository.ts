import mongoose from "mongoose";
import { UserModel } from "../models/user.model";

export class MongoDbUserRepository {
  repository = UserModel;

  async getAll() {
    return this.repository.find({});
  }
}
