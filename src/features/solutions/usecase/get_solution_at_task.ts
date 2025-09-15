import { ClassConstructor } from "class-transformer";
import { CallbackStrategyWithValidationModel, ResponseBase } from "../../../core/controllers/http_controller";
import { Result } from "../../../core/helpers/result";
import { QueryIdModel } from "../../../core/models/query_id_model";

export class GetSolutionAtTask extends CallbackStrategyWithValidationModel<QueryIdModel> {
  validationModel: ClassConstructor<QueryIdModel> = QueryIdModel;
  call = async (model: QueryIdModel): ResponseBase =>
    Result.isNotNull(
      await this.client.solution.findMany({
        where: {
          taskId: model.id,
        },
      })
    );
}