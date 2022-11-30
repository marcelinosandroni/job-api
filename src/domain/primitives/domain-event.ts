export class DomainEvent {
  readonly dateTimeOccurred: Date;

  constructor(public readonly name: string) {
    this.dateTimeOccurred = new Date();
  }
}
