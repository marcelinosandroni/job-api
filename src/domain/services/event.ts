import { EventEmitter } from "events";

export class EventService {
  private readonly events = new EventEmitter();

  publish(name: string, data: unknown): void {
    this.events.emit(name, data);
  }

  subscribe(name: string, operation: (...args: unknown[]) => void): void {
    this.events.addListener(name, operation);
  }
}
