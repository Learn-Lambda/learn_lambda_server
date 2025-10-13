import { FeatureHttpController } from "../../core/controllers/feature_http_controller";
import { AccessLevel, SubRouter } from "../../core/controllers/http_controller";
import { GetUserPlanTags } from "./usecase/get_user_plan_tags";
import { GetUserStatisticTypesUsage } from "./usecase/get_user_statistic_types_usage";
import { UpdateUserStatisticTypesUsage } from "./usecase/update_user_statistic_types";

export class StatisticTypesUsageFeature extends FeatureHttpController {
  constructor() {
    super();
    this.subRoutes = [
      new SubRouter(
        "/get/user/statistic/types/usage",
        new GetUserStatisticTypesUsage(),
        AccessLevel.public,
        "POST"
      ),
      new SubRouter(
        "/get/user/plan/tags",
        new GetUserPlanTags(),
        AccessLevel.user,
        "GET"
      ),
      new SubRouter(
        "/update/user/statistic/types/usage",
        new UpdateUserStatisticTypesUsage(),
        AccessLevel.user,
        "POST"
      ),
    ];
  }
}
