import { ClassConstructor } from "class-transformer";
import { FeatureHttpController } from "../../core/controllers/feature_http_controller";
import {
  CallbackStrategyCreateDbModel,
  CallBackStrategyPagination,
  CallbackStrategyUpdateModel,
  CallbackStrategyWithEmpty,
  CallBackStrategyDeleteModelByQueryId,
  ResponseBase,
  SubRouter,
  AccessLevel,
  CallbackStrategyWithValidationModel,
} from "../../core/controllers/http_controller";
import { Result } from "../../core/helpers/result";
import { Prisma } from "@prisma/client";
import { TaskEditModel, TaskValidationModel } from "./model/task";
import { VM } from "vm2";
import ts from "typescript";
import { IsNumber, IsString } from "class-validator";
import { generateSHA256 } from "../../core/helpers/sha256";
import { CreateTaskModelUseCase } from "./usecase/create_task_model_usecase";
import { TypedEvent } from "../../core/helpers/typed_event";
import { IPrivateSocketData } from "../../core/controllers/private_socket_subscriber";
interface TaskUpdate extends IPrivateSocketData {
  tasks: number[];
}

export class TasksSocketFeature extends TypedEvent<TaskUpdate> {}

export const tasksSocketFeature = new TasksSocketFeature();
export class CurrentTasksCollection extends CallbackStrategyWithEmpty {
  call = async (): ResponseBase => Result.ok(this.currentSession);
}

export class GetAllTasks extends CallBackStrategyPagination<Prisma.TaskWhereInput> {
  dbCollectionName: string = "task";
}

export class EditTask extends CallbackStrategyUpdateModel<TaskEditModel> {
  validationModel: ClassConstructor<TaskEditModel> = TaskEditModel;
  dbCollectionName: string = "task";
}

export class CreateTask extends CallbackStrategyCreateDbModel<TaskValidationModel> {
  dbCollectionName: string = "task";
  modelHelper(model: TaskValidationModel): TaskValidationModel {
    model.testArguments = JSON.stringify(model.testArguments);
    return model;
  }
  validationModel: ClassConstructor<TaskValidationModel> = TaskValidationModel;
}
export class DeleteTask extends CallBackStrategyDeleteModelByQueryId {
  deleteCallback = async (id: number) => {
    await this.client.solution.deleteMany({ where: { taskId: id } });
  };
  dbCollectionName: string = "task";
}

export class RunTaskModel {
  @IsNumber()
  taskNumber: number;
  @IsString()
  code: string;
}
export class RunTask extends CallbackStrategyWithValidationModel<RunTaskModel> {
  validationModel: ClassConstructor<RunTaskModel> = RunTaskModel;
  call = async (model: RunTaskModel): ResponseBase =>
    Result.isNotNull(
      await this.client.task.findFirst({ where: { id: model.taskNumber } })
    ).map((databaseModel) => {
      return new RunTaskUseCase()
        .call(
          new TestModel(
            databaseModel.functionName,
            model.code,
            JSON.parse(databaseModel.testArguments)
          )
        )
        .map(async (el) => {
          const hash = generateSHA256(model.code.trim());

          return Result.isNotNull(
            await this.client.solution.findFirst({ where: { hash: hash } })
          ).fold(
            async (_) => {
              return Result.ok(el);
            },
            async (_) => {
              await this.client.solution.create({
                data: {
                  authorId: Number(this.currentSession),
                  taskId: databaseModel.id,
                  hash: hash,
                  code: model.code,
                },
              });
              return Result.ok(el);
            }
          );
        });
    });
}

export class CodeModel {
  @IsString()
  code: string;
}
class FillInTaskModel extends CallbackStrategyWithValidationModel<CodeModel> {
  validationModel: ClassConstructor<CodeModel> = CodeModel;
  call = (model: CodeModel): ResponseBase =>
    new CreateTaskModelUseCase().call(model.code);
}

class UserCurrentTaskCollection extends CallbackStrategyWithEmpty {
  call = async (): ResponseBase =>
    Result.isNotNull(
      await this.client.userCurrentTaskCollection.findFirst({
        where: { userId: Number(this.currentSession) },
      })
    ).fold(
      async (model) => Result.ok(model),
      async () =>
        Result.isNotNull(
          await this.client.userCurrentTaskCollection.create({
            data: {
              userId: Number(this.currentSession),
            },
          })
        )
    );
}

class AddTaskModel {
  @IsNumber()
  id: number;
}
export class AddTask extends CallbackStrategyWithValidationModel<AddTaskModel> {
  validationModel: ClassConstructor<AddTaskModel> = AddTaskModel;
  async call(model: AddTaskModel): ResponseBase {
    const userTasks = await this.client.userCurrentTaskCollection.findFirst({
      where: { userId: this.getUserIdNumber() },
    });
    userTasks.currentTasksIds.addUniqValue(model.id);
    await this.client.userCurrentTaskCollection.update({
      where: { id: userTasks.id },
      data: {
        currentTasksIds: userTasks.currentTasksIds,
      },
    });

    tasksSocketFeature.emit({
      tasks: userTasks.currentTasksIds,
      userId: this.getUserIdNumber(),
    });
    return Result.ok("added");
  }
}
export class GetLastTask extends CallbackStrategyWithEmpty {
  async call(): ResponseBase {
    const userTasks = await this.client.userCurrentTaskCollection.findFirst({
      where: { userId: this.getUserIdNumber() },
    });
    return Result.isNotNull(
      await this.client.task.findFirst({
        where: { id: userTasks.currentTasksIds.lastElement() },
      })
    );
  }
}
export class TasksFeature extends FeatureHttpController {
  constructor() {
    super();
    this.subRoutes = [
      new SubRouter("/tasks", new GetAllTasks(), AccessLevel.public, "GET"),
      new SubRouter("/tasks", new CreateTask(), AccessLevel.public, "POST"),
      new SubRouter("/tasks", new EditTask(), AccessLevel.admin, "PUT"),
      new SubRouter("/tasks", new DeleteTask(), AccessLevel.admin, "DELETE"),
      new SubRouter("/run/task", new RunTask(), AccessLevel.user, "POST"),
      new SubRouter("/add/task", new AddTask(), AccessLevel.user, "POST"),
      new SubRouter(
        "/get/last/task",
        new GetLastTask(),
        AccessLevel.user,
        "GET"
      ),
      new SubRouter(
        "/create/task/model",
        new FillInTaskModel(),
        AccessLevel.admin,
        "POST"
      ),
      new SubRouter(
        "/current/task",
        new UserCurrentTaskCollection(),
        AccessLevel.user,
        "GET"
      ),
    ];
  }
}

class TestModel {
  functionName: string;

  testFunction: string;

  testArguments: { result: any; arguments: any }[];
  constructor(functionName: string, testFunction: string, testArguments) {
    this.functionName = functionName;
    this.testFunction = testFunction;
    this.testArguments = testArguments;
  }
}

export class RunTaskUseCase {
  // TODO: нужна обработка ошибок на несщуествующую функцию
  // TODO: нужна обработка если компилятор TS сломается
  // TODO: нужна обработка если JS транспилятор сломается
  call(testModel: TestModel) {
    console.log(testModel.testArguments);
    return Result.ok(
      testModel.testArguments
        .map(
          (_, index) =>
            ` const assert = (ffff: Function, args: any, value: any) => {
  const result = ffff.apply(this, args);
  if (result === value) {
    return {
      result: result,
      status: true,
    };
  } else {
    return {
      result: result,
      status: false,
    };
  }
};

        ${testModel.testFunction}
        assert(${testModel.functionName}, [${
              testModel.testArguments.at(index).arguments
            }], ${testModel.testArguments.at(index).result})`
        )
        .map((el, index) => {
          try {
            const result = new VM().run(
              ts.transpileModule(el, {
                compilerOptions: {
                  module: ts.ModuleKind.CommonJS,
                  target: ts.ScriptTarget.ES5,
                },
              }).outputText
            );

            return new TaskExecuteResult(
              testModel.functionName,
              testModel.testArguments.at(index).arguments,
              result.result,
              testModel.testArguments.at(index).result,
              result.status
            );
          } catch (error) {
            console.log(error);
            return;
          }
        })
    );
  }
}

export class TaskExecuteResult {
  functionName: string;
  wasLaunchedWithArguments: any;
  theResultWasObtained: string;
  theResultWasExpected: string;
  status: boolean;
  constructor(
    functionName,
    wasLaunchedWithArguments,
    theResultWasObtained,
    theResultWasExpected,
    status
  ) {
    this.functionName = functionName;
    this.wasLaunchedWithArguments = wasLaunchedWithArguments;
    this.theResultWasObtained = theResultWasObtained;
    this.theResultWasExpected = theResultWasExpected;
    this.status = status;
  }
}
