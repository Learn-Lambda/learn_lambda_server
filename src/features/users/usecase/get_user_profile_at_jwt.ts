import { CallbackStrategyWithEmpty, ResponseBase } from "../../../core/controllers/http_controller";
import { Result } from "../../../core/helpers/result";

export class GetUserProfileAtJWT extends CallbackStrategyWithEmpty {
  call = async (): ResponseBase =>
    (await this.getUserId()).map((databaseModel) => {
      delete databaseModel["password"];
      return Result.ok(databaseModel);
    });
}
