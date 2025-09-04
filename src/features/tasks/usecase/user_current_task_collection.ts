import { CallbackStrategyWithEmpty, ResponseBase } from "../../../core/controllers/http_controller";
import { Result } from "../../../core/helpers/result";

export class UserCurrentTaskCollection extends CallbackStrategyWithEmpty {
  call = async (): ResponseBase =>
    Result.isNotNull(
      await this.client.userCurrentTaskCollection.findFirst({
        where: { userId: Number(this.currentSession) },
      })
    ).fold(
      async (model) => Result.ok(model),
      async () =>
        Result.isNotNull(
          await this.client.userCurrentTaskCollection.create({
            data: {
              userId: Number(this.currentSession),
            },
          })
        )
    );
}
