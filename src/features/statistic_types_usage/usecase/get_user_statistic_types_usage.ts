import { ClassConstructor } from "class-transformer";
import {
  CallbackStrategyWithValidationModel,
  ResponseBase,
} from "../../../core/controllers/http_controller";
import { Result } from "../../../core/helpers/result";
import { UserStatisticModel } from "../model/user_statistic";

export class GetUserStatisticTypesUsage extends CallbackStrategyWithValidationModel<UserStatisticModel> {
  validationModel: ClassConstructor<UserStatisticModel> = UserStatisticModel;
  call = async (model: UserStatisticModel): ResponseBase => {
    return Result.isNotNull(
      await this.client.statisticTypesUsage.findFirst({
        where: {
          userId: model.userId,
        },
      })
    ).map((el) => {
      el.jsonStatisticUsage = JSON.parse(el.jsonStatisticUsage);
      return Result.ok(el);
    });
  };
}
