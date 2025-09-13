import { FeatureHttpController } from "../../core/controllers/feature_http_controller";
import { AccessLevel, SubRouter } from "../../core/controllers/http_controller";
import { GetUserStatisticWithYear } from "./usecase/get_user_statistic_with_year";
import { GetYearsUserStatistic } from "./usecase/get_years_user_statistic";

export class StatisticSolutionFeature extends FeatureHttpController {
  constructor() {
    super();
    this.subRoutes = [
      new SubRouter(
        "/get/years/user/statistic",
        new GetYearsUserStatistic(),
        AccessLevel.public,
        "GET",
      ),
      new SubRouter(
        "/get/user/statistic/with/year",
        new GetUserStatisticWithYear(),
        AccessLevel.public,
        "GET",
      ),
    ];
  }
}
