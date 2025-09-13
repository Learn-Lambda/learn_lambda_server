import { CallbackStrategyWithEmpty, ResponseBase } from "../../../core/controllers/http_controller";
import { Result } from "../../../core/helpers/result";
import jwt from "jsonwebtoken";

export class GetTokenVscode extends CallbackStrategyWithEmpty {
  call = async (): ResponseBase =>
    (await this.getUserId()).map((databaseModel) =>
      Result.ok({
        token: jwt.sign(
          { userId: databaseModel.id.toString(), env: "vscode" },
          process.env.USER_JWT_SECRET
        ),
      })
    );
}