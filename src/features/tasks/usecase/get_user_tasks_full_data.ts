import { CallbackStrategyWithEmpty, ResponseBase } from "../../../core/controllers/http_controller";
import { Result } from "../../../core/helpers/result";

export class GetUserTasksFullData extends CallbackStrategyWithEmpty {
  async call(): ResponseBase {
    return Result.isNotNull(
      await this.client.userCurrentTaskCollection.findFirst({
        where: { userId: this.getUserIdNumber() },
      })
    ).map(
      async (tasks) =>
        await Promise.all(
          tasks.currentTasksIds.map(async (el) => {
            return await this.client.task.findFirst({ where: { id: el } });
          })
        )
    );
  }
}