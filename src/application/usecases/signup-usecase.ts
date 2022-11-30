import { UserRepository } from "application/repositories/user-repository";
import { Result } from "domain/abstractions/result";
import { User, UserInput, UserProperties } from "domain/entities/user";
import { UseCase } from "domain/primitives/usecase";

// Param must be valided on the outer edge of the application [presentation]
type Input = UserInput;

// Result is either a valid created user or a error [domain or persistence]
type Output = UserProperties | Error;

export class SignUpUseCase implements UseCase<Input, Output> {
  constructor(private readonly repository: UserRepository) {}

  async execute(input: UserInput): Promise<Output> {
    return User.create(input)
      .bindWithoutState(this.repository.save)
      .mapWith({
        success: (user) => user.toObject(),
        failure: (error) => error,
      });
  }
}
