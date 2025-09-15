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
    at: new Empty({ importance: 1 }),
    parenthesisAccessOperator: new Empty({ importance: 1 }),
    length: new Empty({ importance: 1 }),
    constructorUsage: new Empty({ importance: 2 }),
    from: new Empty({ importance: 2 }),
    isArray: new Empty({ importance: 2 }),
    of: new Empty({ importance: 2 }),
    concat: new Empty({ importance: 1 }),
    copyWithin: new Empty({ importance: 3 }),
    entries: new Empty({ importance: 3 }),
    every: new Empty({ importance: 2 }),
    fill: new Empty({ importance: 2 }),
    filter: new Empty({ importance: 2 }),
    find: new Empty({ importance: 1 }),
    findIndex: new Empty({ importance: 1 }),
    flat: new Empty({ importance: 3 }),
    flatMap: new Empty({ importance: 3 }),
    forEach: new Empty({ importance: 1 }),
    includes: new Empty({ importance: 1 }),
    indexOf: new Empty({ importance: 1 }),
    join: new Empty({ importance: 1 }),
    map: new Empty({ importance: 1 }),
    pop: new Empty({ importance: 1 }),
    push: new Empty({ importance: 1 }),
    reduce: new Empty({ importance: 1 }),
    reduceRight: new Empty({ importance: 3 }),
    reverse: new Empty({ importance: 1 }),
    shift: new Empty({ importance: 1 }),
    slice: new Empty({ importance: 1 }),
    some: new Empty({ importance: 1 }),
    sort: new Empty({ importance: 1 }),
    splice: new Empty({ importance: 1 }),
    unshift: new Empty({ importance: 1 }),
    values: new Empty({ importance: 3 }),
  },
  Object: {
    assign: new Empty({ importance: 1 }),
    keys: new Empty({ importance: 1 }),
    entries: new Empty({ importance: 1 }),
    freeze: new Empty({ importance: 3 }),
    seal: new Empty({ importance: 3 }),
    hasOwn: new Empty({ importance: 3 }),
    parenthesisAccessOperator: new Empty({ importance: 1 }),
  },
  Map: {
    clear: new Empty({ importance: 1 }),
    delete: new Empty({ importance: 1 }),
    entries: new Empty({ importance: 1 }),
    forEach: new Empty({ importance: 1 }),
    get: new Empty({ importance: 1 }),
    has: new Empty({ importance: 1 }),
    keys: new Empty({ importance: 2 }),
    set: new Empty({ importance: 1 }),
    size: new Empty({ importance: 1 }),
  },
  Set: {
    add: new Empty({ importance: 1 }),
    clear: new Empty({ importance: 1 }),
    delete: new Empty({ importance: 1 }),
    entries: new Empty({ importance: 3 }),
    forEach: new Empty({ importance: 1 }),
    has: new Empty({ importance: 1 }),
    keys: new Empty({ importance: 2 }),
    values: new Empty({ importance: 3 }),
    size: new Empty({ importance: 1 }),
  },
  Number: {
    toExponential: new Empty({ importance: 3 }),
    toFixed: new Empty({ importance: 3 }),
    toPrecision: new Empty({ importance: 3 }),
    parseFloat: new Empty({ importance: 2 }),
    parseInt: new Empty({ importance: 2 }),
    isFinite: new Empty({ importance: 3 }),
    isInteger: new Empty({ importance: 3 }),
    isNaN: new Empty({ importance: 3 }),
    constructorUsage: new Empty({ importance: 1 }),
  },
  RegExp: {
    test: new Empty({ importance: 1 }),
    exec: new Empty({ importance: 1 }),
  },
};
