import { extensions } from "../../src/core/extensions/extensions";

import { StatisticTypeUsageCompleteUseCase } from "../../src/features/statistic_types_usage/statistic_types_usage_computed_usecase";
import { useCaseTest } from "../core/helper/use_case_test";

const defaultTypesUsage = {
  String: {},
  Array: {},
  Object: {},
  Map: {},
  Set: {},
  Number: {},
  Boolean: {},
  RegExp: {},
};

extensions();
const assignDefaultObject = (assign) =>
  Object.assign(JSON.parse(JSON.stringify(defaultTypesUsage)), assign);

describe("feature statistic types usage", async () => {
  useCaseTest(
    "String",
    "/code_types_usage/string.ts",
    new StatisticTypeUsageCompleteUseCase(),
    assignDefaultObject({
      String: {
        at: 1,
        charAt: 1,
        charCodeAt: 1,
        codePointAt: 1,
        concat: 1,
        endsWith: 1,
        includes: 1,
        indexOf: 1,
        lastIndexOf: 1,
        localeCompare: 1,
        match: 1,
        normalize: 1,
        padEnd: 1,
        padStart: 1,
        repeat: 1,
        replace: 1,
        length: 1,
        parenthesisAccessOperator: 1,
        search: 1,
        slice: 1,
        split: 1,
        startsWith: 1,
        substring: 1,
        toLocaleLowerCase: 1,
        toLocaleUpperCase: 1,
        toLowerCase: 1,
        toUpperCase: 1,
        trim: 1,
        trimEnd: 1,
        trimStart: 1,
      },
      RegExp: {
        // match: 0,
        exec: 0,
      },
    })
  );
  useCaseTest(
    "Array",
    "/code_types_usage/array.ts",
    new StatisticTypeUsageCompleteUseCase(),
    assignDefaultObject({
      Array: {
        at: 1,
        parenthesisAccessOperator: 1,
        length: 1,
        constructorUsage: 1,
        from: 1,
        isArray: 1,
        of: 1,
        concat: 1,
        copyWithin: 1,
        entries: 1,
        every: 1,
        fill: 1,
        filter: 1,
        find: 1,
        findIndex: 1,
        flat: 1,
        flatMap: 1,
        forEach: 1,
        includes: 1,
        indexOf: 1,
        join: 1,
        map: 1,
        pop: 1,
        push: 1,
        reduce: 1,
        reduceRight: 1,
        reverse: 1,
        shift: 1,
        slice: 1,
        some: 1,
        sort: 1,
        splice: 1,
        unshift: 1,
        values: 1,
      },
    })
  );
  useCaseTest(
    "Number",
    "/code_types_usage/number.ts",
    new StatisticTypeUsageCompleteUseCase(),
    assignDefaultObject({
      Number: {
        toExponential: 1,
        toFixed: 1,
        toPrecision: 1,
        parseFloat: 1,
        parseInt: 1,
        isFinite: 1,
        isInteger: 1,
        isNaN: 1,
        constructorUsage: 1,
      },
    })
  );
  useCaseTest(
    "Object",
    "/code_types_usage/object.ts",
    new StatisticTypeUsageCompleteUseCase(),
    assignDefaultObject({
      Object: {
        assign: 1,
        keys: 1,
        entries: 1,
        freeze: 1,
        seal: 1,
        hasOwn: 1,
        parenthesisAccessOperator: 1,
      },
    })
  );
  useCaseTest(
    "RegExp",
    "/code_types_usage/reg_exp.ts",
    new StatisticTypeUsageCompleteUseCase(),
    assignDefaultObject({
      RegExp: {
        test: 2,
        exec: 2,
      },
    })
  );
  useCaseTest(
    "Map",
    "/code_types_usage/map.ts",
    new StatisticTypeUsageCompleteUseCase(),
    assignDefaultObject({
      Map: {
        clear: 1,
        delete: 1,
        entries: 1,
        forEach: 1,
        get: 1,
        has: 1,
        keys: 1,
        set: 1,
        size: 1,
      },
    })
  );
  useCaseTest(
    "Set",
    "/code_types_usage/set.ts",
    new StatisticTypeUsageCompleteUseCase(),
    assignDefaultObject({
      Set: {
        add: 1,
        clear: 1,
        delete: 1,
        entries: 1,
        forEach: 1,
        has: 1,
        keys: 1,
        values: 1,
        size: 1,
      },
    })
  );
});
