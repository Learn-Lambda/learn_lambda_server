import { ClassConstructor } from "class-transformer";
import {
  CallbackStrategyWithValidationModel,
  ResponseBase,
} from "../../../core/controllers/http_controller";
import { Result } from "../../../core/helpers/result";
import { IsNumber, IsOptional } from "class-validator";

export class UserStatisticWithYear {
  @IsOptional()
  @IsNumber()
  year?: number;
  @IsNumber()
  userId: number;
}

export class GetUserStatisticWithYear extends CallbackStrategyWithValidationModel<UserStatisticWithYear> {
  validationModel: ClassConstructor<UserStatisticWithYear> =
    UserStatisticWithYear;
  call = async (model: UserStatisticWithYear): ResponseBase =>
    model.year == undefined
      ? Result.isNotNull(
          this.client.statisticTaskSolutions.aggregate({
            _max: {
              year: true,
            },
            where: {
              userId: model.userId,
            },
          })
        )
      : Result.isNotNull(
          this.client.statisticTaskSolutions.findFirst({
            where: {
              userId: model.userId,
              year: model.year,
            },
          })
        );
}
