export type Option<T> = Some<T> | None;

export class Some<T> {
  constructor(public readonly value: T) {}
}

export class None {
  constructor() {}
}
