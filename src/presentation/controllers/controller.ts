import { HttpRequest } from "presentation/interfaces/http/http-request";
import { HttpResponse } from "presentation/interfaces/http/http-response";

export interface Controller {
  handle(request: HttpRequest): Promise<HttpResponse>;
}
