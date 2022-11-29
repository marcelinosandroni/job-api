import { SignUpUseCase } from "data/usecases/signup-usecase";
import { Result } from "domain/errors/result";
import { Validation } from "domain/validation/validation";
import { HttpRequest } from "presentation/interfaces/http/http-request";
import { HttpResponse } from "presentation/interfaces/http/http-response";
import { Controller } from "../controller";

export class SignUpController implements Controller {
  constructor(
    private readonly signupService: SignUpUseCase,
    private readonly validator: Validation
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    return Result.from(request.body)
      .flat<{ name: string }>(this.validator.validate)
      .flat(this.signupService.execute)
      .mapWith({
        success: (value) => ({ statusCode: 200, body: value }),
        failure: () => ({
          statusCode: 400,
          body: { message: "Invalid params" },
        }),
      });
  }
}
