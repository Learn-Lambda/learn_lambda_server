import {
  CallbackStrategyWithEmpty,
  ResponseBase,
} from "../../../core/controllers/http_controller";
import { Result } from "../../../core/helpers/result";
export interface StatisticUsage {
  usageSingly: number;
  aiUsage: number;
  usageTotal: number;
  target: number;
  importance: number;
}
export class GetUserPlanTags extends CallbackStrategyWithEmpty {
  call = async (): ResponseBase => {
    return Result.isNotNull(
      await this.client.statisticTypesUsage.findFirst({
        where: {
          userId: this.getUserIdNumber(),
        },
      })
    ).map((el) => {
      return Result.ok(
        Object.entries(JSON.parse(el.jsonStatisticUsage as string))
          .map((el) => {
            return Object.entries(el.at(1)).map((element) => {
              const statistic = element.at(1) as StatisticUsage;

              if (statistic.target > statistic.usageTotal) {
                return `${el.at(0)}.${element.at(0)}`;
              }
              return undefined;
            });
          })
          .flat()
          .filter((el) => el !== undefined)
      );
    });
  };
}
