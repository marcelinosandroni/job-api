import { DomainError } from "./domain-error";

export class ChangeToSameValue extends DomainError {
  constructor(propertyName: string) {
    super(`Change to same ${propertyName} not allowed`);
  }
}
