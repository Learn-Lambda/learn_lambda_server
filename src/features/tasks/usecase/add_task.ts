import { ClassConstructor } from "class-transformer";
import {
  CallbackStrategyWithValidationModel,
  ResponseBase,
} from "../../../core/controllers/http_controller";
import { Result } from "../../../core/helpers/result";
import { tasksSocketFeature } from "../tasks";
import { IsNumber } from "class-validator";
class AddTaskModel {
  @IsNumber()
  id: number;
}
export class AddTask extends CallbackStrategyWithValidationModel<AddTaskModel> {
  validationModel: ClassConstructor<AddTaskModel> = AddTaskModel;
  async call(model: AddTaskModel): ResponseBase {
    const userTasks = await this.client.userCurrentTaskCollection.findFirst({
      where: { userId: this.getUserIdNumber() },
    });
    userTasks.currentTasksIds.addUniqValue(model.id);
    await this.client.userCurrentTaskCollection.update({
      where: { id: userTasks.id },
      data: {
        currentTasksIds: userTasks.currentTasksIds,
      },
    });

    tasksSocketFeature.emit({
      tasks: userTasks.currentTasksIds,
      userId: this.getUserIdNumber(),
    });
    return Result.ok("added");
  }
}
 
