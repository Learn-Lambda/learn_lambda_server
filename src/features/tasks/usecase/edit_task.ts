import { ClassConstructor } from "class-transformer";
import { CallbackStrategyUpdateModel } from "../../../core/controllers/http_controller";
import { TaskEditModel } from "../model/task";

export class EditTask extends CallbackStrategyUpdateModel<TaskEditModel> {
  validationModel: ClassConstructor<TaskEditModel> = TaskEditModel;
  dbCollectionName: string = "task";
}
