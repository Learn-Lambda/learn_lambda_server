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
}

export class GetAllYearsUserActivity extends CallbackStrategyWithValidationModel<GetUseActivityModel> {
  validationModel: ClassConstructor<GetUseActivityModel> = GetUseActivityModel;
  call = async (model: GetUseActivityModel): ResponseBase =>
    Result.isNotNull(
      await this.client.statisticTaskSolutions.findMany({
        where: { userId: model.userId },
      })
    ).fold(
      async (s) => Result.ok(s.map((el) => el.year)),
      async (_) => Result.ok([new Date().getFullYear()])
    );
}
