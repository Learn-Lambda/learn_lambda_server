import { CallbackStrategyWithEmpty, ResponseBase } from "../../../core/controllers/http_controller";
import { Result } from "../../../core/helpers/result";

export class CurrentTasksCollection extends CallbackStrategyWithEmpty {
  call = async (): ResponseBase => Result.ok(this.currentSession);
}
 
 