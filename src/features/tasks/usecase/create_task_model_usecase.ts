import ts from "typescript";
import { Result } from "../../../core/helpers/result";
import { IsString, IsArray } from "class-validator";
import { ResponseBase } from "../../../core/controllers/http_controller";

class AstParser {
  static findFunctionName(sourceFile: ts.SourceFile): Result<void, string> {
    const queue: ts.Node[] = [sourceFile];
    let result = null;
    while (queue.length > 0) {
      const node = queue.shift()!;

      if (ts.isFunctionDeclaration(node) && node.name) {
        console.log("FunctionDeclaration:", node.name.text);
      } else if (ts.isVariableStatement(node)) {
        node.declarationList.declarations.forEach((decl) => {
          if (ts.isVariableDeclaration(decl) && decl.name && decl.initializer) {
            if (
              ts.isFunctionExpression(decl.initializer) ||
              ts.isArrowFunction(decl.initializer)
            ) {
              result = Result.ok(decl.name.getText());
            }
          }
        });
      }

      node.getChildren().forEach((child) => queue.push(child));
    }
    if (result === null) {
      return Result.error(undefined);
    }
    return result;
  }
  static findArgs(
    rootNode: ts.Node,
    fnName: string
  ): Result<void, { arguments: any[]; result: any }[]> {
    const stack: ts.Node[] = [rootNode];
    const args = [];
    while (stack.length > 0) {
      const node = stack.pop()!;

      if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        node.expression.expression.getText() === "console" &&
        node.expression.name.getText() === "log"
      ) {
        node.arguments.forEach((arg) => {
          args.push({
            result: eval(
              rootNode
                .getText()
                .split("\n")
                .filter((el) => el.includes(arg.getText()))
                .at(0)
                .split("//")
                .at(1)
            ),
            arguments: arg
              .getText()
              .replace(fnName, "")
              .replace("(", "")
              .replace(")", "")
              .split(",")
              .map((el) => eval(el)),
          });
        });
      }

      node.getChildren().forEach((child) => stack.push(child));
    }
    return Result.ok(args);
  }
}

// AstParser.findArgs(sourceFile, "p");
export class TaskBody {
  @IsString()
  functionName: string;
  @IsArray()
  testArguments: { result: any; arguments: any }[] | string;
  @IsString()
  code: string;
  constructor(functionName, testArguments, code) {
    this.functionName = functionName;
    this.testArguments = testArguments;
    this.code = code;
  }
}
export class CreateTaskModelUseCase {
  call = async (code: string): ResponseBase => {
    const sourceFile = ts.createSourceFile(
      "sample.ts",
      code,
      ts.ScriptTarget.Latest,
      true
    );
    return AstParser.findFunctionName(sourceFile).map((fnName) =>
      AstParser.findArgs(sourceFile, fnName).map((args) =>
        Result.ok(new TaskBody(fnName, args, code))
      )
    );
  };
}
 