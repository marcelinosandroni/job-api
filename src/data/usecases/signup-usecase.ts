import { UserRespository } from "data/interfaces/user-repository";
import { User, UserProperties } from "domain/entities/user.entity";
import { UseCase } from "domain/usecases/usecase";
import { randomUUID } from "crypto";

namespace SignUpUseCase {
  export class Service implements UseCase<Input, Output> {
    constructor(private readonly repository: UserRespository) {}

    async execute(input: Input): Promise<Output> {
      const id = randomUUID();
      const now = new Date();
      const entity = new User(
        id,
        input.name,
        input.email,
        input.password,
        now,
        now
      );

      const savedEntity = await this.repository.save(entity);
      return savedEntity.toObject();
    }
  }

  export interface Input {
    name: string;
    email: string;
    password: string;
  }

  export type Output = UserProperties;
}
