import { Prisma } from "@prisma/client";
import { CallBackStrategyPagination } from "../../../core/controllers/http_controller";

export class GetAllTasks extends CallBackStrategyPagination<Prisma.TaskWhereInput> {
  dbCollectionName: string = "task";
}

 