import { IsNumber } from "class-validator";
import {
  CallbackStrategyWithValidationModel,
  ResponseBase,
} from "../../../core/controllers/http_controller";
import { ClassConstructor } from "class-transformer";
import { Result } from "../../../core/helpers/result";

export class GetUseActivityModel {
  @IsNumber()
  userId: number;
  @IsNumber()
  year: number;
}

export class GetUserActivityInYear extends CallbackStrategyWithValidationModel<GetUseActivityModel> {
  validationModel: ClassConstructor<GetUseActivityModel> = GetUseActivityModel;
  call = async (model: GetUseActivityModel): ResponseBase =>
    Result.isNotNull(
      await this.client.statisticTaskSolutions.findFirst({
        where: { userId: model.userId, year: model.year },
      })
    ).fold(
      async (ok) => Result.ok(ok),
      async (_) =>
        Result.ok(
          await this.client.statisticTaskSolutions.create({
            data: {
              userId: model.userId,
              year: model.year,
              statistic: JSON.stringify({}),
            },
          })
        )
    );
}
