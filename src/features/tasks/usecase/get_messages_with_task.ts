import { ClassConstructor } from "class-transformer";
import {
  CallbackStrategyWithValidationModel,
  ResponseBase,
} from "../../../core/controllers/http_controller";
import { TaskSolvedWithAi } from "./solve_with_ai";
import { Result } from "../../../core/helpers/result";

export class GetMessagesWithTask extends CallbackStrategyWithValidationModel<TaskSolvedWithAi> {
  validationModel: ClassConstructor<TaskSolvedWithAi> = TaskSolvedWithAi;
  call = async (model: TaskSolvedWithAi): ResponseBase =>
    Result.isNotNull(
      await this.client.solvedWithAi.findFirst({
        where: {
          taskId: model.taskId,
          userId: {
            equals: model.userId,
          },
        },
      })
    ).map((el) => Result.ok(JSON.parse(el.solvedMessage as string)));
}
