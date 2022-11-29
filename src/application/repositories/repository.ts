export interface Respository<Output = unknown> {
  getAll(value: unknown): Promise<Output>;
  save(value: unknown): Promise<Output>;
}
