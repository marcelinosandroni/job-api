import { User } from "domain/entities/user.entity";

export interface UserRespository {
  save(user: User): Promise<User>;
}
