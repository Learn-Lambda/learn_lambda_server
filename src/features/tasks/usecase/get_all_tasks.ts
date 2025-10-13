import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import {
  CallBackStrategyPagination,
  CallbackStrategyWithValidationModel,
  ResponseBase,
} from "../../../core/controllers/http_controller";
import { ClassConstructor } from "class-transformer";
import { Result } from "../../../core/helpers/result";
import { Prisma } from "@prisma/client";

export class GetAllTasks extends CallBackStrategyPagination<Prisma.TaskWhereInput> {
  dbCollectionName: string = "task";
}
export class TaskQuery {
  @IsNumber()
  page: number;
  @IsOptional()
  @IsArray()
  tags?: string[];
  @IsOptional()
  @IsNumber()
  complexity?: number;
  @IsOptional()
  @IsBoolean()
  isAiSolution?: boolean;
  @IsOptional()
  @IsBoolean()
  isTaskComplete?: boolean;
}
export class GetAllTasksClient extends CallbackStrategyWithValidationModel<TaskQuery> {
  pageSize: number = 10;
  validationModel: ClassConstructor<TaskQuery> = TaskQuery;
  call = async (model: TaskQuery): ResponseBase => {
    const where = {};

    let result = null;
    const skip = (model.page - 1) * 10;
    const take = 10;
    if (model.tags !== undefined && model.tags.isNotEmpty()) {
      where["tags"] = {
        hasSome: model.tags,
      };
    }
    if (model.complexity !== undefined && model.complexity !== 0) {
      where["complexity"] = {
        equals: model.complexity,
      };
    }

    if (model.isAiSolution !== undefined && model.isAiSolution) {
      where["usersWhoSolvedTaskAiHelp"] = {
        has: this.getUserIdNumber(),
      };
    }
    if (model.isTaskComplete !== undefined && model.isTaskComplete) {
      where["usersWhoSolvedTheTask"] = {
        has: this.getUserIdNumber(),
      };
    }
    try {
      result = await this.client.task.findMany({
        where: where,
        skip,
        take,
      });
    } catch (error) {
      result = null;
    }

    return Result.isNotNull(result).map(async (el) => {
      const totalCount = await this.client.task.count({ where: where });

      return Result.ok({
        data: el,
        totalCount: totalCount,
        totalPages: Math.ceil(totalCount / this.pageSize),
        currentPage: model.page,
      });
    });
  };
}
