import {
  CallbackStrategyWithEmpty,
  ResponseBase,
} from "../../../core/controllers/http_controller";
import { Result } from "../../../core/helpers/result";

export class GetLastTask extends CallbackStrategyWithEmpty {
  async call(): ResponseBase {
    const userTasks = await this.client.userCurrentTaskCollection.findFirst({
      where: { userId: this.getUserIdNumber() },
    });
    if(userTasks.currentTasksIds.lastElement() === undefined){
      return Result.error('Empty current task collection ')
    }
    return Result.isNotNull(
      await this.client.task.findFirst({
        where: { id: userTasks.currentTasksIds.lastElement() },
      })
    );
  }
}
