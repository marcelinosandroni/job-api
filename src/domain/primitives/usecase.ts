export interface UseCase<Input, Output> {
  execute(value: Input): Promise<Output>;
}
