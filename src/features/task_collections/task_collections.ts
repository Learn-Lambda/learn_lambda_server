import { FeatureHttpController } from "../../core/controllers/feature_http_controller";
import { SubRouter, AccessLevel } from "../../core/controllers/http_controller";
import { GetAllTasks, CreateTask, EditTask, DeleteTask } from "../tasks/tasks";

export class TaskCollectionsFeature extends FeatureHttpController {
  constructor() {
    super();
    this.subRoutes = [
      new SubRouter("/tasks", new GetAllTasks(), AccessLevel.public, "GET"),
      new SubRouter("/tasks", new CreateTask(), AccessLevel.admin, "POST"),
      new SubRouter("/tasks", new EditTask(), AccessLevel.admin, "PUT"),
      new SubRouter("/tasks", new DeleteTask(), AccessLevel.admin, "DELETE"),
    ];
  }
}
