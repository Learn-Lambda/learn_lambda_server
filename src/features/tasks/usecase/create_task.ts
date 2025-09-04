import { ClassConstructor } from "class-transformer";
import { CallbackStrategyCreateDbModel } from "../../../core/controllers/http_controller";
import { TaskValidationModel } from "../model/task";

export class CreateTask extends CallbackStrategyCreateDbModel<TaskValidationModel> {
  dbCollectionName: string = "task";
  modelHelper(model: TaskValidationModel): TaskValidationModel {
    model.testArguments = JSON.stringify(model.testArguments);
    return model;
  }
  validationModel: ClassConstructor<TaskValidationModel> = TaskValidationModel;
}