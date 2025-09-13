import { CallBackStrategyDeleteModelByQueryId } from "../../../core/controllers/http_controller";

export class DeleteUser extends CallBackStrategyDeleteModelByQueryId {
  deleteCallback = undefined;
  dbCollectionName: string = "user";
}