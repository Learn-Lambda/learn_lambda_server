import { ClassConstructor } from "class-transformer";
import {
  CallbackStrategyWithValidationModel,
  ResponseBase,
} from "../../../core/controllers/http_controller";
import { Result } from "../../../core/helpers/result";
import { IsNumber, IsString } from "class-validator";

export class Update {
  @IsNumber()
  id: number;
  @IsString()
  statistic: string;
}

export class UpdateUserStatisticTypesUsage extends CallbackStrategyWithValidationModel<Update> {
  validationModel: ClassConstructor<Update> = Update;
  call = async (model: Update): ResponseBase =>
    Result.isNotNull(
      await this.client.statisticTypesUsage.update({
        where: {
          id: model.id,
        },
        data: {
          jsonStatisticUsage: model.statistic,
        },
      })
    );
}
