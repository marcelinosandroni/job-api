import { User } from "domain/entities/user.entity";
import { Name } from "domain/value-objects/name.value-object";
import { UniqueIdentifier } from "domain/value-objects/unique-identifier";

interface UserFactoryInput {
  id: string;
  name: string;
  email: string;
  password: string;
  createDate: Date;
  lastChangeDate: Date;
  currentJob?: string;
  jobApplies?: { company: string }[];
}
export class UserFactory {
  static create(input: UserFactoryInput): User {
    const id = new UniqueIdentifier(input.id);
    const name = new Name(input.name);
    return new User(
      input.id,
      input.name,
      input.email,
      input.password,
      input.createDate,
      input.lastChangeDate,
      input.currentJob,
      input.jobApplies
    );
  }
}
