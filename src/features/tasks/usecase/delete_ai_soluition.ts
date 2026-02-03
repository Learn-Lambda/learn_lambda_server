import { ClassConstructor } from "class-transformer";
import {
  CallbackStrategyWithValidationModel,
  ResponseBase,
} from "../../../core/controllers/http_controller";
import { TaskSolvedWithAi } from "./solve_with_ai";
import { Result } from "../../../core/helpers/result";

export class DeleteAiSolution extends CallbackStrategyWithValidationModel<TaskSolvedWithAi> {
  validationModel: ClassConstructor<TaskSolvedWithAi> = TaskSolvedWithAi;
  call = async (model: TaskSolvedWithAi): ResponseBase => {
    try {
      return Result.isNotNull(
        await this.client.solvedWithAi.delete({ where: { id: model.taskId } })
      );
    } catch (error) {
        return Result.ok('')
    }
  };
}
