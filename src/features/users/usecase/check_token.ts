import { ClassConstructor } from "class-transformer";
import {
  CallbackStrategyWithValidationModel,
  ResponseBase,
} from "../../../core/controllers/http_controller";
import { Result } from "../../../core/helpers/result";
import { Token } from "../model/token";
import jwt from "jsonwebtoken";

export class CheckToken extends CallbackStrategyWithValidationModel<Token> {
  validationModel: ClassConstructor<Token> = Token;
  call(model: Token): ResponseBase {
    return jwt.verify(
      model.token.trim().replace(/\s+/g, ""),
      process.env.USER_JWT_SECRET,
      (err: any, user: any) => {
        if (err) {
          return Result.error(jwt.sign({}, process.env.USER_JWT_SECRET));
        }
        return Result.ok("token valid");
      }
    );
  }
}
