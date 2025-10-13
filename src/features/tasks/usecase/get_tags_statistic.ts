import {
  CallbackStrategyWithEmpty,
  ResponseBase,
} from "../../../core/controllers/http_controller";
import { Result } from "../../../core/helpers/result";

export class GetTagsStatistic extends CallbackStrategyWithEmpty {
  call = async (): ResponseBase =>
    Result.isNotNull(await this.client.solutionTags.findFirst()).map((el) =>
      Result.ok(JSON.parse(el.jsonStatisticUsage as string))
    );
}
