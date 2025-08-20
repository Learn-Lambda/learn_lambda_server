import { extensions } from "../../src/core/extensions/extensions";
import { VMContext, VmUseCase } from "../../src/features/vm/vm";
import { getFake } from "../core/helper/get_fake";
import { testEqualObject } from "../core/helper/test_equal_object";

extensions();

describe("feature vm feature test", async () => {
  it("vm1 ", async () => {
    let vMContext: VMContext[] | undefined;
    await new VmUseCase()
      .call(await getFake("/code_vm/code_vm_1.ts"))
      .map(async (el) => {
        vMContext = el;
      });
    testEqualObject(vMContext, [
      { line: 1, logs: "200", status: "success" },
      { line: 2, logs: null, status: "success" },
      { line: 3, logs: null, status: "not_execute" },
      { line: 4, logs: null, status: "empty" },
      { line: 5, logs: null, status: "error" },
    ]);
  });
  it("vm2", async () => {
    let vMContext: VMContext[] | undefined;
    await new VmUseCase()
      .call(await getFake("/code_vm/code_vm_2.ts"))
      .map(async (el) => {
        vMContext = el;
      });
    testEqualObject(vMContext, [
      { line: 1, logs: "200", status: "success" },
      { line: 2, logs: null, status: "success" },
      { line: 3, logs: null, status: "not_execute" },
      { line: 4, logs: null, status: "not_execute" },
      { line: 5, logs: null, status: "not_execute" },
      { line: 6, logs: null, status: "not_execute" },
      { line: 7, logs: null, status: "not_execute" },
      { line: 8, logs: null, status: "empty" },
      { line: 9, logs: null, status: "error" },
    ]);
  });
  it("vm3 ", async () => {
    let vMContext: VMContext[] | undefined;
    await new VmUseCase()
      .call(await getFake("/code_vm/code_vm_3.ts"))
      .map(async (el) => {
        vMContext = el;
      });
    testEqualObject(vMContext, [
      { line: 1, logs: null, status: "success" },
      { line: 2, logs: null, status: "empty" },
      { line: 3, logs: null, status: "empty" },
    ]);
  });
  it("vm4 ", async () => {
    let vMContext: VMContext[] | undefined;
    await new VmUseCase()
      .call(await getFake("/code_vm/code_vm_4.ts"))
      .map(async (el) => {
        vMContext = el;
      });
    testEqualObject(vMContext, [
      { line: 1, logs: null, status: "success" },
      { line: 2, logs: "200,200", status: "success" },
      { line: 3, logs: null, status: "empty" },
      { line: 4, logs: "201", status: "success" },
      { line: 5, logs: null, status: "success" },
      { line: 6, logs: null, status: "success" },
    ]);
  });
  it("vm5 ", async () => {
    let vMContext: VMContext[] | undefined;
    await new VmUseCase()
      .call(await getFake("/code_vm/code_vm_5.ts"))
      .map(async (el) => {
        vMContext = el;
      });
    testEqualObject(vMContext, [
      { line: 1, logs: null, status: "success" },
      { line: 2, logs: "200,200", status: "success" },
      { line: 3, logs: null, status: "empty" },
      { line: 4, logs: null, status: "success" },
      { line: 5, logs: null, status: "success" },
      { line: 6, logs: "200", status: "success" },
      { line: 7, logs: "200", status: "success" },
    ]);
  });
  it("vm6", async () => {
    let vMContext: VMContext[] | undefined;
    await new VmUseCase()
      .call(await getFake("/code_vm/code_vm_6.ts"))
      .map(async (el) => {
        vMContext = el;
      });
    testEqualObject(vMContext, [
      { line: 1, logs: "undefined", status: "success" },
    ]);
  });
  it("vm7", async () => {
    let vMContext: VMContext[] | undefined;
    await new VmUseCase()
      .call(await getFake("/code_vm/code_vm_7.ts"))
      .map(async (el) => {
        vMContext = el;
      });
    testEqualObject(vMContext, [
      { line: 1, logs: null, status: "success" },
      { line: 2, logs: null, status: "success" },
      { line: 3, logs: null, status: "empty" },
      { line: 4, logs: null, status: "success" },
    ]);
  });
});
