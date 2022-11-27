import { UniqueIdentifier } from "domain/value-objects/unique-identifier";

export interface BaseEntityProperties {
  id: UniqueIdentifier;
}

export abstract class Entity<Properties extends BaseEntityProperties> {
  constructor(protected properties: Properties) {}

  get id(): UniqueIdentifier {
    return this.properties.id;
  }

  equals(entity: Entity<Properties>): boolean {
    if (!entity.properties.id) {
      return false;
    }
    return this.properties.id === entity.properties.id;
  }

  toObject(): Properties {
    return this.properties;
  }

  toJson(): string {
    return JSON.stringify(this.properties);
  }

  toString(): string {
    return this.toJson();
  }

  valueof(): Properties {
    return this.properties;
  }
}
