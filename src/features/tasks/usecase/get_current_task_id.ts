import { CallbackStrategyWithEmpty, ResponseBase } from "../../../core/controllers/http_controller";
import { Result } from "../../../core/helpers/result";

export class GetCurrentTaskId extends CallbackStrategyWithEmpty {
  async call(): ResponseBase {
    return Result.isNotNull(
      await this.client.userCurrentTaskCollection.findFirst({
        where: { userId: this.getUserIdNumber() },
      })
    ).map(async (userTasks) => {
      return { currentTask: userTasks.currentTasksIds.lastElement() };
    });
  }
}
