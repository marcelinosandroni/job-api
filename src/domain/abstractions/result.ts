export class Result<Type = unknown> {
  readonly isFailure = !this.value;
  readonly isSuccess = !!this.value;

  private constructor(readonly value: Type, readonly error?: Error) {
    Object.freeze(this);
  }

  bind<Output = Type>(transformation: (input: Type) => Output): Result<Output> {
    if (this.isFailure) {
      return Result.failure(this.error);
    }
    return Result.from<Output>(transformation(this.value));
  }

  bindWithoutState<Output>(
    transformation: (input: Type) => Output
  ): Result<Type> {
    if (this.isFailure) {
      return Result.failure(this.error);
    }
    transformation(this.value);
    return Result.from(this.value);
  }

  flat<Output = Type>(
    transformation: (input: Type) => Result<Output>
  ): Result<Output> {
    if (this.isFailure) {
      return Result.failure(this.error);
    }
    return transformation(this.value);
  }

  mapWith<Success, Failure>({
    success,
    failure,
  }: {
    success: (value: Type) => Success;
    failure: (error: Error) => Failure;
  }): Result<Success> {
    if (this.isFailure) {
      return Result.failure(failure(this.error as Error));
    }

    return Result.success(success(this.value));
  }

  static from<Output>(value: Output): Result<Output> {
    return value
      ? Result.success(value)
      : Result.failure(new Error("Value is null"));
  }

  static success<Type = unknown>(value: Type): Result<Type> {
    return new Result<Type>(value);
  }

  static failure<Type = unknown>(error?: Error): Result<Type> {
    return new Result<Type>(null as Type, error);
  }
}
