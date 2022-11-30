export class ApplicationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }

  static user = {
    notFound: new ApplicationError("User not found"),
    incorrectPassword: new ApplicationError("Incorrect password"),
  };
}
