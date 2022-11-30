import { UserRepository } from "application/repositories/user-repository";
import { User, UserProperties } from "domain/entities/user.entity";
import mongoose from "mongoose";
import { UserModel } from "../models/user.model";

export class UserMongoDbRepository implements UserRepository {
  repository = UserModel;

  async getAll(): UserProperties[] {
    const userSchema = await this.repository.find({});
    const user = userSchema[0];
    return userSchema;
  }

  async save(user: User) {
    await this.repository.create(user);
  }
}
