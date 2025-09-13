import { IsNumber } from "class-validator";
import {
  CallbackStrategyWithValidationModel,
  ResponseBase,
} from "../../../core/controllers/http_controller";
import { ClassConstructor } from "class-transformer";
import { Result } from "../../../core/helpers/result";

export class UserStatistic {
  @IsNumber()
  id: number;
}

export class GetYearsUserStatistic extends CallbackStrategyWithValidationModel<UserStatistic> {
  validationModel: ClassConstructor<UserStatistic> = UserStatistic;
  call = async (model: UserStatistic): ResponseBase =>
    Result.isNotNull(
      this.client.statisticTaskSolutions.findMany({
        where: {
          userId: model.id,
        },
      })
    );
}
