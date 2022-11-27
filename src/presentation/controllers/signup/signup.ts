import { HttpRequest } from "presentation/interfaces/http/http-request";
import { HttpResponse } from "presentation/interfaces/http/http-response";
import { Validation } from "presentation/validators/validation";
import { Controller } from "../controller";

export class SignUpController implements Controller {
  constructor(
    private readonly signupService: signUpUseCase,
    private readonly validator: Validation
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const error = this.validator(request.body);
    if (error) {
      return { statusCode: 400, body: { message: "Invalid params" } };
    }
    this.signupService;
  }
}
