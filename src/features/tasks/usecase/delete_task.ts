import { CallBackStrategyDeleteModelByQueryId } from "../../../core/controllers/http_controller";

export class DeleteTask extends CallBackStrategyDeleteModelByQueryId {
  deleteCallback = async (id: number) => {
    await this.client.solution.deleteMany({ where: { taskId: id } });
  };
  dbCollectionName: string = "task";
}

  
  