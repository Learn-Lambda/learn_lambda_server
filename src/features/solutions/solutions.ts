import { FeatureHttpController } from "../../core/controllers/feature_http_controller";
import { SubRouter, AccessLevel } from "../../core/controllers/http_controller";
import { GetSolutionAtTask } from "./usecase/get_solution_at_task";
import { DeleteSolution } from "./usecase/delete_solution";

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
