import { Prisma } from "@prisma/client";
import { FeatureHttpController } from "../../core/controllers/feature_http_controller";
import {
  SubRouter,
  AccessLevel,
  CallBackStrategyPagination,
} from "../../core/controllers/http_controller";
export class GetAllSolutions extends CallBackStrategyPagination<Prisma.SolutionWhereInput> {
  dbCollectionName: string = "solution";
}
export class SolutionsFeature extends FeatureHttpController {
  constructor() {
    super();
    this.subRoutes = [
      new SubRouter(
        "/solutions",
        new GetAllSolutions(),
        AccessLevel.public,
        "GET"
      ),
    ];
  }
}
