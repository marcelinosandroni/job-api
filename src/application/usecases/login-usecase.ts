import { UseCase } from "domain/primitives/usecase";

import { ApplicationError } from "application/errors/application-error";
import { UserRepository } from "application/repositories/user-repository";
import { Result } from "domain/abstractions/result";
import { UserProperties } from "domain/entities/user";
import { Token } from "domain/interfaces/token";
import { Password } from "domain/value-objects/password";

// Received user credentials to authenticate
interface Input {
  email: string;
  password: string;
}

// Return the authenticated user and valid token with 1 hour expieration time
type Output = Result<{
  user: UserProperties;
  token: Token;
}>;

export class LoginUseCase implements UseCase<Input, Output> {
  constructor(private readonly repository: UserRepository) {}

  async execute(input: Input): Promise<Output> {
    return Result.from(await this.repository.getByEmail(input.email))
      .bindWithoutState(async (user) =>
        user.authenticate(Password.create({ value: input.password }))
      )
      .mapWith({
        success: (user) => ({ user, token: user.generateToken() }),
        failure: () => ApplicationError.user.incorrectPassword,
      });

    //WITH CONDITIONS
    // const user = await this.repository.getByEmail(input.email);
    // if (!user) {
    //   return Result.failure<Output>(ApplicationError.user.notFound);
    // }
    // const password = Password.create({ value: input.password, hashed: false });
    // const credentialResult = await user.authenticate(password);
    // if (!credentialResult.isFailure) {
    //   return Result.failure(ApplicationError.user.incorrectPassword);
    // }
    // const token = user.generateToken();
    // const output = { user: user.toObject(), token };
    // return Result.success(output);
  }
}
