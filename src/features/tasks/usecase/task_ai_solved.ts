import { ClassConstructor } from "class-transformer";
import {
  CallbackStrategyWithValidationModel,
  ResponseBase,
} from "../../../core/controllers/http_controller";
import { TaskSolvedWithAi } from "./solve_with_ai";
import { Result } from "../../../core/helpers/result";

export class TaskAiSolved extends CallbackStrategyWithValidationModel<TaskSolvedWithAi> {
  validationModel: ClassConstructor<TaskSolvedWithAi> = TaskSolvedWithAi;
  call = async (model: TaskSolvedWithAi): ResponseBase => {
    return Result.isNotNull(
      await this.client.solvedWithAi.findFirst({
        where: {
          taskId: model.taskId,
          userId: {
            equals: model.userId,
          },
        },
      })
    ).fold(
      (solvedWithAi) =>
        Result.ok({ solvedWithAi: solvedWithAi.date.toString() }),
      (_) => Result.ok({ solvedWithAi: "none" })
    );
  };
}
