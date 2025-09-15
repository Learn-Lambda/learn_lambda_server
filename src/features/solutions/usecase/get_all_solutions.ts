import { Prisma } from "@prisma/client";
import { CallBackStrategyPagination } from "../../../core/controllers/http_controller";

export class GetAllSolutions extends CallBackStrategyPagination<Prisma.SolutionWhereInput> {
  dbCollectionName: string = "solution";
}
