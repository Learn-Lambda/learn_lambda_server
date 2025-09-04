import { CallbackStrategyWithEmpty, ResponseBase } from "../../../core/controllers/http_controller";
import { Result } from "../../../core/helpers/result";

export class GetLastTask extends CallbackStrategyWithEmpty {
  async call(): ResponseBase {
    const userTasks = await this.client.userCurrentTaskCollection.findFirst({
      where: { userId: this.getUserIdNumber() },
    });
    return Result.isNotNull(
      await this.client.task.findFirst({
        where: { id: userTasks.currentTasksIds.lastElement() },
      })
    );
  }
}
 