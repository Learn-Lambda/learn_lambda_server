import { ClassConstructor } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import {
  CallbackCore,
  CallbackStrategyWithValidationModel,
  ResponseBase,
} from "../../../core/controllers/http_controller";
import { Result } from "../../../core/helpers/result";
import { generateSHA256 } from "../../../core/helpers/sha256";
import ts from "typescript";
import { VM } from "vm2";
import prettier from "prettier";
import { StatisticTypeUsageCompleteUseCase } from "../../statistic_types_usage/usecase/statistic_types_usage_computed_usecase";
import { JsonValue } from "@prisma/client/runtime/library";
import exp from "constants";
import { Prisma } from "@prisma/client";
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
const transpile = (code: string): Result<string, string> => {
  try {
    return Result.ok(
      ts.transpileModule(code.replaceAll("export", ""), {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          target: ts.ScriptTarget.ES5,
        },
      }).outputText,
    );
  } catch (_) {
    return Result.error("transpile error");
  }
};
const runVm = (code: string): Result<string, any> => {
  try {
    return Result.ok(new VM().run(removeConsoleLogs(code)));
  } catch (_) {
    return Result.error("ошибка исполнения");
  }
};
export interface TestResult {
  value: Value;
}

export interface Value {
  functionName: string;
  wasLaunchedWithArguments: string;
  theResultWasObtained: string;
  theResultWasExpected: string;
  status: boolean;
}

function hasFunctionNamedFnInString(
  code: string,
  functionName: string,
): Result<string, boolean> {
  const sourceFile = ts.createSourceFile(
    "temp.ts", // имя файла произвольное, нужно для парсинга
    code,
    ts.ScriptTarget.Latest,
    true,
  );

  let found = false;

  function visit(node: ts.Node) {
    if (ts.isFunctionDeclaration(node) && node.name?.text === functionName) {
      found = true;
      return;
    }

    if (ts.isVariableStatement(node)) {
      node.declarationList.declarations.forEach((decl) => {
        if (
          ts.isIdentifier(decl.name) &&
          decl.name.text === functionName &&
          decl.initializer &&
          (ts.isFunctionExpression(decl.initializer) ||
            ts.isArrowFunction(decl.initializer))
        ) {
          found = true;
        }
      });
    }

    if (!found) ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  if (found) return Result.ok(found);

  return Result.error(`не найдена функция ${functionName}`);
}

export class RunTaskUseCase {
  call = async (
    testModel: TestModel,
  ): Promise<Result<Result<TaskExecuteResult, any>[], any>> =>
    Result.ok(
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
        assert(${testModel.functionName}, [${argumentsMapper(
          testModel.testArguments.at(index).arguments,
        )}], ${argumentsMapper(testModel.testArguments.at(index).result)})`,
        )
        .map((el, index) =>
          transpile(el).map((code) =>
            hasFunctionNamedFnInString(code, testModel.functionName).map((_) =>
              runVm(code).map((vmResult) =>
                Result.ok(
                  new TaskExecuteResult(
                    testModel.functionName,
                    testModel.testArguments.at(index).arguments,
                    vmResult.result,
                    testModel.testArguments.at(index).result,
                    vmResult.status,
                  ),
                ),
              ),
            ),
          ),
        ),
    );
}
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
export class TaskExecuteResult {
  functionName: string;
  wasLaunchedWithArguments: any;
  theResultWasObtained: any;
  theResultWasExpected: string;
  status: boolean;
  constructor(
    functionName,
    wasLaunchedWithArguments,
    theResultWasObtained,
    theResultWasExpected,
    status,
  ) {
    this.functionName = functionName;
    this.wasLaunchedWithArguments = wasLaunchedWithArguments;
    this.theResultWasObtained = theResultWasObtained;
    if (theResultWasObtained === undefined) {
      this.theResultWasObtained = "undefined";
    }
    this.theResultWasExpected = theResultWasExpected;
    this.status = status;
  }
  toText(): String {
    const f = () =>
      this.wasLaunchedWithArguments.length > 1 ? "аргументами" : "аргументом";
    return `функция ${
      this.functionName
    } была запущена с ${f()} ${JSON.stringify(
      this.wasLaunchedWithArguments.join(","),
    )} `;
  }
}

export class RunTaskModel {
  @IsNumber()
  taskNumber: number;
  @IsString()
  code: string;
}
interface Statistic {
  date: string | Date;
  count: number;
}
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export class UpdateUserStatistic extends CallbackCore {
  call = async (userId: number) => {
    const statisticTaskSolutions =
      await this.client.statisticTaskSolutions.findFirst({
        where: { userId: userId, year: new Date().getFullYear() },
      });
    // console.log(statisticTaskSolutions.statistic)
    if (statisticTaskSolutions.statistic === null) {
      statisticTaskSolutions.statistic = [];
    } else {
      statisticTaskSolutions.statistic = JSON.parse(
        statisticTaskSolutions.statistic as string,
      );
    }
    // @ts-ignore
    const statistics = (statisticTaskSolutions.statistic as Statistic[]).map(
      (el) => {
        return {
          date: new Date(el.date),
          count: el.count,
        };
      },
    );

    statisticTaskSolutions.statistic = JSON.stringify(
      statisticTaskSolutions.statistic,
    );

    const foundDate = statistics.find((date) => {
      return formatDate(date.date) === formatDate(new Date());
    });

    if (foundDate) {
      foundDate.count += 1;
    } else {
      statistics.push({ date: new Date(), count: 1 });
    }
    statisticTaskSolutions.statistic = JSON.stringify(statistics);
    await this.client.statisticTaskSolutions.update({
      where: {
        id: statisticTaskSolutions.id,
      },
      data: statisticTaskSolutions,
    });
  };
}

export class RunTask extends CallbackStrategyWithValidationModel<RunTaskModel> {
  validationModel: ClassConstructor<RunTaskModel> = RunTaskModel;
  call = async (model: RunTaskModel): ResponseBase =>
    Result.isNotNull(
      await this.client.task.findFirst({ where: { id: model.taskNumber } }),
    ).map(async (databaseModel) => {
      return await (
        await new RunTaskUseCase().call(
          new TestModel(
            databaseModel.functionName,
            model.code,
            JSON.parse(databaseModel.testArguments),
          ),
        )
      ).map(async (runTask) => {
        const runTaskResult = runTask as TestResult[];
        const testIsSuccess = runTaskResult
          .filter((el) => el.value.status)
          .isNotEmpty();

        const isAiSolution: boolean = Result.isNotNull(
          await this.client.solvedWithAi.findFirst({
            where: {
              taskId: databaseModel.id,
              userId: {
                equals: this.getUserIdNumber(),
              },
            },
          }),
        ).fold(
          (solvedMessage) => {
            if (isNaN(solvedMessage.date.getTime())) return false;
            if (isSameDay(solvedMessage.date, new Date())) return true;
            return false;
          },
          (_) => false,
        );

        if (testIsSuccess) {
          const userCurrentTaskCollection =
            await this.client.userCurrentTaskCollection.findFirst({
              where: { userId: this.getUserIdNumber() },
            });

          await this.client.userCurrentTaskCollection.update({
            where: { id: userCurrentTaskCollection.id },
            data: {
              currentTasksIds: userCurrentTaskCollection.currentTasksIds.filter(
                (el) => el !== model.taskNumber,
              ),
            },
          });
          const formatCode = await removeMissingConsoleLogAndFormat(model.code);
          databaseModel.usersWhoSolvedTheTask.push(this.getUserIdNumber());
          await this.client.task.update({
            where: { id: databaseModel.id },
            data: databaseModel,
          });

          (
            await new StatisticTypeUsageCompleteUseCase().call(
              codeOneCall(model.code),
            )
          ).map(async (statisticTypeUsage) => {
            await new UpdateUserStatistic().call(this.getUserIdNumber());

            const statisticTypesUsage =
              await this.client.statisticTypesUsage.findFirst({
                where: {
                  userId: this.getUserIdNumber(),
                },
              });

            const jsonStatisticUsage = JSON.parse(
              // @ts-ignore
              statisticTypesUsage.jsonStatisticUsage,
            );

            Object.entries(statisticTypeUsage).forEach((value) => {
              if (Object.keys(value.at(1)).length !== 0) {
                Object.entries(value.at(1)).forEach((el) => {
                  const key = isAiSolution ? "aiUsage" : "usageSingly";

                  // @ts-ignore
                  jsonStatisticUsage[value.at(0)][el.at(0)][key] += el.at(1);
                  // @ts-ignore
                  jsonStatisticUsage[value.at(0)][el.at(0)].usageTotal +=
                    el.at(1);
                });
              }
            });

            await this.client.statisticTypesUsage.update({
              where: { id: statisticTypesUsage.id },
              data: {
                jsonStatisticUsage: JSON.stringify(jsonStatisticUsage),
              },
            });
          });

          Result.isNotNull(
            await this.client.statisticTaskSolutions.findFirst({
              where: {
                userId: this.getUserIdNumber(),
                year: new Date().getFullYear(),
              },
            }),
          ).fold(
            async (s) => {},
            async (_) => {
              Result.isNotNull(
                await this.client.statisticTaskSolutions.create({
                  data: {
                    userId: this.getUserIdNumber(),
                    year: new Date().getFullYear(),
                    statistic: JSON.stringify({}),
                  },
                }),
              ).map((el) => {});
            },
          );

          return Result.isNotNull(
            await this.client.solution.create({
              data: {
                taskId: databaseModel.id,
                hash: generateSHA256(clearCode(model.code)),
                code: formatCode,
                counter: 0,
              },
            }),
          ).map(() => Result.ok(runTaskResult));
        } else {
          return Result.ok(runTaskResult);
        }
      });
    });
}
const removeConsoleLogs = (code: string) => {
  const lines = code.split("\n");

  const indexes = lines
    .map((line, index) =>
      line === ""
        ? index
        : line.includes("console.log") && line.includes("//")
          ? index
          : -1,
    )
    .filter((index) => index !== -1);
  return lines.filter((_, index) => !indexes.includes(index)).join("\n");
};

const removeMissingConsoleLogAndFormat = (code: string) => {
  return formatCode(removeConsoleLogs(code));
};

async function formatCode(
  code: string,
  parser: prettier.BuiltInParserName = "typescript",
): Promise<string> {
  return prettier.format(code, {
    parser,
    singleQuote: true,
    semi: true,
    tabWidth: 2,
    trailingComma: "all",
  });
}
const clearCode = (code: string) => {
  return code.replace(" ", "").replace("\n", "");
};

const argumentsMapper = (arg: any): string => {
  if (typeof arg === "string") {
    return `"${arg}"`;
  }
  return arg;
};

const codeOneCall = (code: string) => {
  const lines = code.split("\n");

  const indexes = lines
    .map((line, index) =>
      line === ""
        ? index
        : line.includes("console.log") && line.includes("//")
          ? index
          : -1,
    )
    .filter((index) => index !== -1);
  indexes.pop();
  return lines.filter((_, index) => !indexes.includes(index)).join("\n");
};
export class TaskAddSolution extends CallbackStrategyWithValidationModel<RunTaskModel> {
  validationModel: ClassConstructor<RunTaskModel> = RunTaskModel;
  async call(model: RunTaskModel): ResponseBase {
    return Result.isNotNull(
      await this.client.task.findFirst({ where: { id: model.taskNumber } }),
    ).map(async (databaseModel) => {
      return await (
        await new RunTaskUseCase().call(
          new TestModel(
            databaseModel.functionName,
            model.code,
            JSON.parse(databaseModel.testArguments),
          ),
        )
      ).map(async (runTask) => {
        const runTaskResult = runTask as TestResult[];
        const testIsSuccess = runTaskResult
          .filter((el) => el.value.status)
          .isNotEmpty();
        if (testIsSuccess) {
          const formatCode = await removeMissingConsoleLogAndFormat(model.code);

          (
            await new StatisticTypeUsageCompleteUseCase().call(
              codeOneCall(model.code),
            )
          ).map(async (statisticTypeUsage) => {
            // const statisticTypesUsage =
            //   await this.client.statisticTypesUsage.findFirst({
            //     where: {
            //       userId: this.getUserIdNumber(),
            //     },
            //   });
            // console.log(statisticTypesUsage);
            // const jsonStatisticUsage = JSON.parse(
            //   statisticTypesUsage.jsonStatisticUsage
            // );
            // console.log(jsonStatisticUsage);

            const tags: string[] = [];
            Object.entries(statisticTypeUsage).forEach((value) => {
              if (Object.keys(value.at(1)).length !== 0) {
                Object.entries(value.at(1)).forEach((el) => {
                  tags.push(`${value.at(0)}.${el.at(0)}`);
                });
              }
            });
            console.log(tags);
            if (tags.isNotEmpty()) {
              await this.client.task.update({
                where: { id: databaseModel.id },
                data: {
                  tags: databaseModel.tags.concat(
                    tags.filter((el) => !databaseModel.tags.includes(el)),
                  ),
                },
              });
            }
            new UpdateGlobalsTagsStatisticUseCase().call(tags, Operation.plus);
          });

          return Result.isNotNull(
            await this.client.solution.create({
              data: {
                taskId: databaseModel.id,
                hash: generateSHA256(clearCode(model.code)),
                code: formatCode,
                counter: 0,
              },
            }),
          ).map(() => Result.ok(runTaskResult));
        } else {
          return Result.ok(runTaskResult);
        }
      });
    });
  }
}
export enum Operation {
  minus,
  plus,
}
class UpdateGlobalsTagsStatisticUseCase extends CallbackCore {
  call = async (newTags: string[], operation: Operation) => {
    Result.isNotNull(await this.client.solutionTags.findFirst()).fold(
      async (solutionTags) =>
        await this._update(solutionTags, newTags, operation),
      async (_) =>
        await this._update(
          await this.client.solutionTags.create({
            data: { jsonStatisticUsage: JSON.stringify({}) },
          }),
          newTags,
          operation,
        ),
    );
  };

  _update = async (
    solutionTags: { id: number; jsonStatisticUsage: JsonValue },
    newTags: string[],
    operation: Operation,
  ) => {
    const oldTags = JSON.parse(solutionTags.jsonStatisticUsage as string);
    newTags.forEach((el) => {
      if (oldTags[el] === undefined) {
        oldTags[el] = 1;
      } else {
        if (operation === Operation.plus) {
          oldTags[el] += 1;
        }
        if (operation === Operation.minus) {
          oldTags[el] -= 1;
        }
      }
    });
    console.log(oldTags);
    await this.client.solutionTags.update({
      where: { id: solutionTags.id },
      data: {
        jsonStatisticUsage: JSON.stringify(oldTags),
      },
    });
  };
}
