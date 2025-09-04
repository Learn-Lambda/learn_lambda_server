import { Prisma } from "@prisma/client";
import { FeatureHttpController } from "../../core/controllers/feature_http_controller";
import {
  SubRouter,
  AccessLevel,
  CallBackStrategyPagination,
  CallbackStrategyWithValidationModel,
  ResponseBase,
  CallBackStrategyDeleteModelByQueryId,
} from "../../core/controllers/http_controller";
import { IsString } from "class-validator";
import { ClassConstructor } from "class-transformer";
import { Result } from "../../core/helpers/result";
import { QueryIdModel } from "../../core/models/query_id_model";
export class GetAllSolutions extends CallBackStrategyPagination<Prisma.SolutionWhereInput> {
  dbCollectionName: string = "solution";
}

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
export class DeleteSolution extends CallBackStrategyDeleteModelByQueryId {
  deleteCallback = async (id: number) => {};
  dbCollectionName: string = "solution";
}

export class SolutionsFeature extends FeatureHttpController {
  constructor() {
    super();
    this.subRoutes = [
      new SubRouter(
        "/solution/at/task",
        new GetSolutionAtTask(),
        AccessLevel.public,
        "POST"
      ),
      new SubRouter(
        "/solution",
        new DeleteSolution(),
        AccessLevel.admin,
        "DELETE"
      ),
    ];
  }
}
