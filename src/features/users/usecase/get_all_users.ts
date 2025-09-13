import { Prisma } from "@prisma/client";
import { CallBackStrategyPagination } from "../../../core/controllers/http_controller";

export class GetAllUsers extends CallBackStrategyPagination<Prisma.TaskWhereInput> {
  dbCollectionName: string = "user";
}