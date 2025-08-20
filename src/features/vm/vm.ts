import {
  CallbackStrategyWithValidationModel,
  CoreHttpController,
  ResponseBase,
} from "../../core/controllers/http_controller";
import { VmValidationModel } from "./vm_validation_model";
import { Result } from "../../core/helpers/result";
import { VM } from "vm2";
import ErrorStackParser from "error-stack-parser";
import * as ts from "typescript";
export interface VMContext {
  line: number;
  logs: string;
  status: string;
}

function replaceConsoleLogToMyLog(code: string, line: number) {
  return code.replace(/console\.log\s*\(/g, (match, offset) => {
    return `console.log(${line}, `;
  });
}

export class VmUseCase {
  call = (code: string): Result<void, VMContext[]> => {
    try {
      const lines = code.split("\n");
      const executedLines: number[] = [];

      function __markExecuted(line: number) {
        if (!executedLines.includes(line)) {
          executedLines.push(line);
        }
      }
      const instrumentedCode = lines
        .map((line, idx) => {
          const lineNumber = idx + 1;
          const replaceLog = replaceConsoleLogToMyLog(line, lineNumber);
          return `__markExecuted(${lineNumber});\n${replaceLog}`;
        })
        .join("\n");

      const emptyLines = lines
        .findAllIndex((el) => el.trim() === "" || el === "}")
        .map((el) => Number(el) + 1);

      const errorLines: number[] = [];
      const logs: { line: number; log: string }[] = [];
      const allLinesNumbers = lines.map((_, i) => i + 1);

      const vm = new VM({
        sandbox: {
          __markExecuted,
          console: {
            log: (...args) => {
              const argsEducated = args.slice(1, args.length).map((el) => {
                if (el === undefined) {
                  return "undefined";
                }
                if (el === null) {
                  return "null";
                }
                return el;
              });

              const index = logs.findIndex((el) => el.line == args.at(0));
              if (index !== -1) {
                logs[index].log = logs
                  .at(index)
                  .log.concat(",")
                  .concat(argsEducated.join(" "));
                return;
              }
              logs.push({
                log: argsEducated.join(" "),
                line: args.at(0),
              });
            },
          },
        },
      });

      try {
        vm.run(
          ts.transpileModule(instrumentedCode, {
            compilerOptions: {
              module: ts.ModuleKind.CommonJS,
              target: ts.ScriptTarget.ES5,
            },
          }).outputText
        );
      } catch (error: any) {
        const parsedStack = ErrorStackParser.parse(error);
        if (parsedStack.length) {
          errorLines.push(parsedStack[0].lineNumber / 2);
        }
      }

      const notExecuted = allLinesNumbers
        .filter((l) => !executedLines.includes(l))
        .filter((el) => !emptyLines.includes(el));

      const executedLinesFilter = executedLines
        .filter((el) => !emptyLines.includes(el))
        .filter((el) => !errorLines.includes(el));

      const z = lines.map((_, i) => {
        const line = i + 1;
        const logEntry = logs.find((l) => l.line === line);

        return {
          line: line,
          logs: logEntry ? logEntry.log : null,
          status: executedLinesFilter.includes(line)
            ? "success"
            : errorLines.includes(line)
            ? "error"
            : notExecuted.includes(line)
            ? "not_execute"
            : emptyLines.includes(line)
            ? "empty"
            : "unknown",
        };
      });
      return Result.ok(z);
    } catch (error) {
      return Result.error(error);
    }
  };
}

export class RunVm extends CallbackStrategyWithValidationModel<VmValidationModel> {
  validationModel = VmValidationModel;
  async call(model: VmValidationModel): ResponseBase {
    return Result.ok(new VmUseCase().call(model.code));
  }
}
export class VmFeature extends CoreHttpController<VmValidationModel> {
  constructor() {
    super({ url: "vm", validationModel: VmValidationModel });

    this.routes.POST = new RunVm().call;
  }
}
