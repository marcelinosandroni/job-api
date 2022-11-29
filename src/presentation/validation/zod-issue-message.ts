import { ZodError, ZodIssue } from "zod";

export class ZodValidationIssueMessage extends Error {
  readonly errors: Record<string, string>;

  constructor(
    public readonly issues: ZodIssue[],
    public readonly message: string
  ) {
    super(message);
    this.errors = this.formatIssueList(issues);
  }

  formatIssueList(issues: ZodIssue[]): Record<string, string> {
    // Desired message format
    // {
    //  "message": "Invalid User properties",
    //  "errors": {
    //    "name": "Name must be at least 2 characters long",
    //    "age": "Age must be at least 18 years old"
    //  }
    // }
    return issues.reduce(
      (formatedIssue, issue) => ({
        ...formatedIssue,
        [issue.path[0]]: issue.message,
      }),
      {}
    );
  }
}
