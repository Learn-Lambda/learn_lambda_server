import { ClassConstructor } from "class-transformer";
import { CallbackStrategyCreateDbModel } from "../../../core/controllers/http_controller";
import { UserModel } from "../model/user_model";
import { emptyStatistic } from "../../statistic_types_usage/model/statistic_types_usage_model";

export class CreateUser extends CallbackStrategyCreateDbModel<UserModel> {
  dbCollectionName: string = "user";
  validationModel: ClassConstructor<UserModel> = UserModel;
  async afterCallback(id: number) {
    await this.client.statisticTypesUsage.create({
      data: {
        userId: id,
        jsonStatisticUsage: JSON.stringify(emptyStatistic),
      },
    });
    await this.client.statisticTaskSolutions.create({
      data: {
        userId: id,
        year: new Date().getFullYear(),
        statistic: null,
      },
    });
  }
}
