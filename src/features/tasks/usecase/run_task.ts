import { ClassConstructor } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import {
  CallbackStrategyWithValidationModel,
  ResponseBase,
} from "../../../core/controllers/http_controller";
import { Result } from "../../../core/helpers/result";
import { generateSHA256 } from "../../../core/helpers/sha256";
import ts from "typescript";
import { VM } from "vm2";

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
      }).outputText
    );
  } catch (_) {
    return Result.error("transpile error");
  }
};
const runVm = (code: string): Result<string, any> => {
  try {
    return Result.ok(new VM().run(code));
  } catch (_) {
    console.log(code);
    console.log(_);
    return Result.error("vm error");
  }
};

function hasFunctionNamedFnInString(
  code: string,
  functionName: string
): Result<string, boolean> {
  const sourceFile = ts.createSourceFile(
    "temp.ts", // имя файла произвольное, нужно для парсинга
    code,
    ts.ScriptTarget.Latest,
    true
  );

  let found = false;

  function visit(node: ts.Node) {
    // Обычная функция с именем
    if (ts.isFunctionDeclaration(node) && node.name?.text === functionName) {
      found = true;
      return;
    }

    // Переменная с присвоенной function expression или arrow function и нужным именем переменной
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
  call = async (testModel: TestModel): Promise<ResponseBase> =>
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
        assert(${testModel.functionName}, [${
              testModel.testArguments.at(index).arguments
            }], ${testModel.testArguments.at(index).result})`
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
                    vmResult.status
                  )
                )
              )
            )
          )
        )
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
    status
  ) {
    this.functionName = functionName;
    this.wasLaunchedWithArguments = wasLaunchedWithArguments;
    this.theResultWasObtained = theResultWasObtained;
    this.theResultWasExpected = theResultWasExpected;
    this.status = status;
  }
  toText(): String {
    const f = () =>
      this.wasLaunchedWithArguments.length > 1 ? "аргументами" : "аргументом";
    return `функция ${
      this.functionName
    } была запущена с ${f()} ${JSON.stringify(
      this.wasLaunchedWithArguments.join(",")
    )} `;
  }
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
    ).map(async (databaseModel) => {
      return await (
        await new RunTaskUseCase().call(
          new TestModel(
            databaseModel.functionName,
            model.code,
            JSON.parse(databaseModel.testArguments)
          )
        )
      ).map(async (runTaskResult) => {
        const hash = generateSHA256(model.code.trim());

        return Result.isNotNull(
          await this.client.solution.findFirst({ where: { hash: hash } })
        ).fold(
          async (_) => Result.ok(runTaskResult),
          async (_) =>
            Result.isNotNull(
              await this.client.solution.create({
                data: {
                  taskId: databaseModel.id,
                  hash: hash,
                  code: model.code,
                },
              })
            ).map(() => Result.ok(runTaskResult))
        );
      });
    });
}
