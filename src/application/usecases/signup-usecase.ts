import { UserRespository } from "data/interfaces/user-repository";
import { User, UserProperties } from "domain/entities/user.entity";
import { randomUUID } from "crypto";
import { UseCase } from "domain/usecases/usecase";
import { Result } from "domain/errors/result";

interface Input {
  name: string;
  email: string;
  password: string;
}

type Output = UserProperties | Error | undefined | string;

export class SignUpUseCase implements UseCase<Input, Output> {
  constructor(private readonly repository: UserRespository) {}

  async execute(input: Input): Promise<Output> {
    return Result.from(User.create(input))
      .bindWithoutState(this.repository.save)
      .mapWith({
        success: (user) => user.toObject(),
        failure: (error) => new Error(error?.message || error || "default"),
      });
  }
}
