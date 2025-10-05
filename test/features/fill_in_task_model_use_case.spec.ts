import { extensions } from "../../src/core/extensions/extensions";
import { FillInTaskModelUseCase } from "../../src/features/tasks/usecase/create_task_model_usecase";
import { getFake } from "../core/helper/get_fake";
import { testEqualObject } from "../core/helper/test_equal_object";

extensions();

export const useCaseTest = async (
  testName: string,

  equal: object
) => {
  it(testName, async () => {
    let result;
    (
      await new FillInTaskModelUseCase().call(
        await getFake(`/fill_in_task_model_use_case/${testName}.ts`)
      )
    ).map((value) => {
      result = value;
    });
    testEqualObject(result, equal);
  });
};

describe("fill in task model usecase", async () => {
  useCaseTest("code1", {
    functionName: "p",
    testArguments: [
      { result: 3, arguments: 3 },
      { result: 2, arguments: 2 },
      { result: 1, arguments: 1 },
    ],
    code: "export const p = (a:number):number =>{\n    return\n}\n\nconsole.log(p(1)) //1\nconsole.log(p(2)) //2\nconsole.log(p(3)) //3",
  });
  useCaseTest("code2", {
    functionName: "p",
    testArguments: [
      { result: "3", arguments: "3" },
      { result: "2", arguments: "2" },
      { result: "1", arguments: "1" },
    ],
    code: "export const p = (a:string):string =>{\n    return\n}\n\nconsole.log(p('1')) //'1'\nconsole.log(p('2')) //'2'\nconsole.log(p('3')) //'3'",
  });
  useCaseTest("code3", {
    functionName: "p",
    testArguments: [
      { result: "3", arguments: "3" },
      { result: "2", arguments: "2" },
      { result: "1", arguments: "1" },
    ],
    code: 'export const p = (a:string):string =>{\n    return\n}\n\nconsole.log(p("1")) //"1"\nconsole.log(p("2")) //"2"\nconsole.log(p("3")) //"3"',
  });
  useCaseTest("code4", {
    functionName: "p",
    testArguments: [
      { result: ["3"], arguments: ["3"] },
      { result: ["2"], arguments: ["2"] },
      { result: ["1"], arguments: ["1"] },
    ],
    code: 'export const p = (a:string[]):string[] =>{\n    return\n}\n\nconsole.log(p(["1"])) //["1"]\nconsole.log(p(["2"])) //["2"]\nconsole.log(p(["3"])) //["3"]',
  });
  useCaseTest("code5", {
    functionName: "p",
    testArguments: [
      { result: [["3"], ["3"], ["3"]], arguments: [["3"], ["3"], ["3"]] },
      { result: [["2"], ["2"], ["2"]], arguments: [["2"], ["2"], ["2"]] },
      { result: [["1"], ["1"], ["1"]], arguments: [["1"], ["1"], ["1"]] },
    ],
    code: 'export const p = (a:string[][]):string[] =>{\n    return\n}\n\nconsole.log(p([["1"],["1"],["1"]])) //[["1"],["1"],["1"]]\nconsole.log(p([["2"],["2"],["2"]])) //[["2"],["2"],["2"]]\nconsole.log(p([["3"],["3"],["3"]])) //[["3"],["3"],["3"]]',
  });
  useCaseTest("code6", {
    functionName: "reverseArr",
    testArguments: [
      { result: ["4", "3"], arguments: ["3", "4"] },
      { result: ["2", "1"], arguments: ["1", "2"] },
      { result: [], arguments: [] },
    ],
    code: "const reverseArr = (arr: any[]): any[] => {\n  return [];\n};\n\nconsole.log(reverseArr([])); //[]\nconsole.log(reverseArr(['1','2'])) //['2','1']\nconsole.log(reverseArr(['3','4'])) //['4','3']\n",
  });
});
