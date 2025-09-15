import { FeatureHttpController } from "../../core/controllers/feature_http_controller";
import { SubRouter, AccessLevel } from "../../core/controllers/http_controller";
import { TypedEvent } from "../../core/helpers/typed_event";
import { IPrivateSocketData } from "../../core/controllers/private_socket_subscriber";
import { AddTask } from "./usecase/add_task";
import { GetTaskById } from "./usecase/get_task_by_id";
import { GetCurrentTaskId } from "./usecase/get_current_task_id";
import { GetLastTask } from "./usecase/get_last_task";
import { GetUserTasksFullData } from "./usecase/get_user_tasks_full_data";
import { UserCurrentTaskCollection } from "./usecase/user_current_task_collection";
import { DeleteTask } from "./usecase/delete_task";
import { EditTask } from "./usecase/edit_task";
import { FillInTaskModel } from "./usecase/fill_in_task_model";
import { RunTask } from "./usecase/run_task";
import { CreateTask } from "./usecase/create_task";
import { GetAllTasks } from "./usecase/get_all_tasks";
interface TaskUpdate extends IPrivateSocketData {
  tasks: number[];
}

export class TasksSocketFeature extends TypedEvent<TaskUpdate> {}

export const tasksSocketFeature = new TasksSocketFeature();

export class TasksFeature extends FeatureHttpController {
  constructor() {
    super();
    this.subRoutes = [
      new SubRouter("/tasks", new GetAllTasks(), AccessLevel.public, "GET"),
      new SubRouter(
        "/get/task/by/id",
        new GetTaskById(),
        AccessLevel.public,
        "POST"
      ),
      new SubRouter("/tasks", new CreateTask(), AccessLevel.public, "POST"),
      new SubRouter("/tasks", new EditTask(), AccessLevel.admin, "PUT"),
      new SubRouter("/tasks", new DeleteTask(), AccessLevel.admin, "DELETE"),
      new SubRouter("/run/task", new RunTask(), AccessLevel.adminUser, "POST"),
      new SubRouter("/add/task", new AddTask(), AccessLevel.user, "POST"),
      new SubRouter(
        "/get/current/tasks/id",
        new GetCurrentTaskId(),
        AccessLevel.user,
        "GET"
      ),
      new SubRouter(
        "/get/last/task",
        new GetLastTask(),
        AccessLevel.user,
        "GET"
      ),
      new SubRouter(
        "/get/user/task/full/data",
        new GetUserTasksFullData(),
        AccessLevel.user,
        "GET"
      ),
      new SubRouter(
        "/fill/task/args",
        new FillInTaskModel(),
        AccessLevel.admin,
        "POST"
      ),
      new SubRouter(
        "/current/task",
        new UserCurrentTaskCollection(),
        AccessLevel.user,
        "GET"
      ),
    
    ];
  }
}
