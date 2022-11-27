import { User } from "domain/entities/user.entity";
import { CreateUserDto } from "presentation/dtos/create-user.dto";

export interface SignupService {
  signup(user: CreateUserDto): User;
}
