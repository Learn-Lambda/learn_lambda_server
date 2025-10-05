import { ClassConstructor } from "class-transformer";
import {
  CallbackStrategyWithValidationModel,
  ResponseBase,
} from "../../../core/controllers/http_controller";
import { QueryIdModel } from "../../../core/models/query_id_model";
import { Result } from "../../../core/helpers/result";
import { tasksSocketFeature } from "../tasks";

export class RemoveTask extends CallbackStrategyWithValidationModel<QueryIdModel> {
  validationModel: ClassConstructor<QueryIdModel> = QueryIdModel;
  async call(model: QueryIdModel): ResponseBase {
    const userCurrentTaskCollection =
      await this.client.userCurrentTaskCollection.findFirst({
        where: { userId: this.getUserIdNumber() },
      });

    const removeTask = userCurrentTaskCollection.currentTasksIds.filter(
      (el) => el !== model.id
    );
    
    tasksSocketFeature.emit({
      tasks: removeTask,
      userId: this.getUserIdNumber(),
    });

    return Result.isNotNull(
      await this.client.userCurrentTaskCollection.update({
        where: { id: userCurrentTaskCollection.id },
        data: {
          currentTasksIds: removeTask,
        },
      })
    );
  }
}
