interface UserStaticUsage {
  [typeUsage: string]: {
    [method: string]: {
      usageSingly: number;
      aiUsage: number;
      usageTotal: number;
      target: number;
    };
  };
}
class Empty {
  usageSingly: number = 0;
  aiUsage: number = 0;
  usageTotal: number = 0;
  target: number = 10;
  importance: number = 3;
  constructor(cl?: {
    usageSingly?: number;
    aiUsage?: number;
    usageTotal?: number;
    target?: number;
    importance?: number;
  }) {
    if (cl === undefined) {
      return;
    }
    if (cl.importance !== undefined) {
      this.importance = cl.importance;
    }
    if (cl.target !== undefined) {
      this.target = cl.target;
    }
    if (cl.usageTotal !== undefined) {
      this.usageTotal = cl.usageTotal;
    }
  }
}

export const emptyStatistic: UserStaticUsage = {
  String: {
    at: new Empty({ importance: 1, target: 20 }),
    charAt: new Empty({ importance: 3, target: 1 }),
    charCodeAt: new Empty({ importance: 2, target: 1 }),
    codePointAt: new Empty({ importance: 3, target: 1 }),
    concat: new Empty({ importance: 1, target: 3 }),
    endsWith: new Empty({ importance: 3, target: 1 }),
    includes: new Empty({ importance: 1, target: 5 }),
    indexOf: new Empty({ importance: 1, target: 6 }),
    lastIndexOf: new Empty({ importance: 1, target: 4 }),
    localeCompare: new Empty({ importance: 3, target: 1 }),
    match: new Empty({ importance: 1, target: 4 }),
    normalize: new Empty({ importance: 3, target: 1 }),
    padEnd: new Empty({ importance: 2, target: 1 }),
    padStart: new Empty({ importance: 2, target: 1 }),
    repeat: new Empty({ importance: 1, target: 6 }),
    replace: new Empty({ importance: 1, target: 6 }),
    length: new Empty({ importance: 1, target: 20 }),
    parenthesisAccessOperator: new Empty({ importance: 1, target: 20 }),
    search: new Empty({ importance: 1, target: 5 }),
    slice: new Empty({ importance: 1, target: 5 }),
    split: new Empty({ importance: 1, target: 10 }),
    startsWith: new Empty({ importance: 1, target: 1 }),
    substring: new Empty({ importance: 1, target: 1 }),
    toLocaleLowerCase: new Empty({ importance: 2, target: 4 }),
    toLocaleUpperCase: new Empty({ importance: 2, target: 4 }),
    toLowerCase: new Empty({ importance: 2, target: 4 }),
    toUpperCase: new Empty({ importance: 2, target: 4 }),
    trim: new Empty({ importance: 3, target: 1 }),
    trimEnd: new Empty({ importance: 3, target: 1 }),
    trimStart: new Empty({ importance: 3, target: 1 }),
  },
  Array: {
    at: new Empty(),
    parenthesisAccessOperator: new Empty(),
    length: new Empty(),
    constructorUsage: new Empty(),
    from: new Empty(),
    isArray: new Empty(),
    of: new Empty(),
    concat: new Empty(),
    copyWithin: new Empty(),
    entries: new Empty(),
    every: new Empty(),
    fill: new Empty(),
    filter: new Empty(),
    find: new Empty(),
    findIndex: new Empty(),
    flat: new Empty(),
    flatMap: new Empty(),
    forEach: new Empty(),
    includes: new Empty(),
    indexOf: new Empty(),
    join: new Empty(),
    map: new Empty(),
    pop: new Empty(),
    push: new Empty(),
    reduce: new Empty(),
    reduceRight: new Empty(),
    reverse: new Empty(),
    shift: new Empty(),
    slice: new Empty(),
    some: new Empty(),
    sort: new Empty(),
    splice: new Empty(),
    unshift: new Empty(),
    values: new Empty(),
  },
  Object: {
    assign: new Empty(),
    keys: new Empty(),
    entries: new Empty(),
    freeze: new Empty(),
    seal: new Empty(),
    hasOwn: new Empty(),
    parenthesisAccessOperator: new Empty(),
  },
  Map: {
    clear: new Empty(),
    delete: new Empty(),
    entries: new Empty(),
    forEach: new Empty(),
    get: new Empty(),
    has: new Empty(),
    keys: new Empty(),
    set: new Empty(),
    size: new Empty(),
  },
  Set: {
    add: new Empty(),
    clear: new Empty(),
    delete: new Empty(),
    entries: new Empty(),
    forEach: new Empty(),
    has: new Empty(),
    keys: new Empty(),
    values: new Empty(),
    size: new Empty(),
  },
  Number: {
    toExponential: new Empty(),
    toFixed: new Empty(),
    toPrecision: new Empty(),
    parseFloat: new Empty(),
    parseInt: new Empty(),
    isFinite: new Empty(),
    isInteger: new Empty(),
    isNaN: new Empty(),
    constructorUsage: new Empty(),
  },
  Boolean: {},
  RegExp: {
    test: new Empty(),
    exec: new Empty(),
  },
};
