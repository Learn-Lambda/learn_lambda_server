import { CallBackStrategyDeleteModelByQueryId,  } from "../../../core/controllers/http_controller";

export class DeleteSolution extends CallBackStrategyDeleteModelByQueryId {
  deleteCallback = async (id: number) => {};

  dbCollectionName: string = "solution";
}
