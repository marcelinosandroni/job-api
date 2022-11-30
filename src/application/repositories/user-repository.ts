import { User } from "domain/entities/user";

export interface UserRepository {
  getById(id: string): Promise<User>;
  getByEmail(email: string): Promise<User>;
  save(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
