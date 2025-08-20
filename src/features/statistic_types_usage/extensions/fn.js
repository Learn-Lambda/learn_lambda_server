function arrayParse(element) {
  if (parseObject.Array.constructorUsage === undefined) {
    parseObject.Array.constructorUsage = 1;
  } else {
    parseObject.Array.constructorUsage += 1;
  }
  return Array(element);
}
function arrayFromParse(element) {
  if (parseObject.Array.from === undefined) {
    parseObject.Array.from = 1;
  } else {
    parseObject.Array.from += 1;
  }
  return Array.from(element);
}
function arrayIsArrayParse(element) {
  if (parseObject.Array.isArray === undefined) {
    parseObject.Array.isArray = 1;
  } else {
    parseObject.Array.isArray += 1;
  }
  return Array.isArray(element);
}
function arrayOfParse(...elements) {
  if (parseObject.Array.of === undefined) {
    parseObject.Array.of = 1;
  } else {
    parseObject.Array.of += 1;
  }
  return Array.of(elements);
}
function parseFloatParse(element) {
  if (parseObject.Number.parseFloat === undefined) {
    parseObject.Number.parseFloat = 1;
  } else {
    parseObject.Number.parseFloat += 1;
  }
  return parseFloat(element);
}
function parseIntParse(element) {
  if (parseObject.Number.parseInt === undefined) {
    parseObject.Number.parseInt = 1;
  } else {
    parseObject.Number.parseInt += 1;
  }
  return parseInt(element);
}
function numberIsFiniteParse(element) {
  if (parseObject.Number.isFinite === undefined) {
    parseObject.Number.isFinite = 1;
  } else {
    parseObject.Number.isFinite += 1;
  }
  return Number.isFinite(element);
}
function numberIsSafeIntegerParse(element) {
  if (parseObject.Number.isInteger === undefined) {
    parseObject.Number.isInteger = 1;
  } else {
    parseObject.Number.isInteger += 1;
  }
  return Number.isInteger(element);
}
function numberIsNaNParse(element) {
  if (parseObject.Number.isNaN === undefined) {
    parseObject.Number.isNaN = 1;
  } else {
    parseObject.Number.isNaN += 1;
  }
  return Number.isNaN(element);
}
function numberIsIntegerParse() {}
function numberParse(element) {
  if (parseObject.Number.constructorUsage === undefined) {
    parseObject.Number.constructorUsage = 1;
  } else {
    parseObject.Number.constructorUsage += 1;
  }
  return Number(element);
}

function elementAt(element, index) {
  if (typeof element === "string") {
    if (parseObject.String.parenthesisAccessOperator === undefined) {
      parseObject.String.parenthesisAccessOperator = 1;
    } else {
      parseObject.String.parenthesisAccessOperator += 1;
    }
  }
  if (element instanceof Array) {
    if (parseObject.Array.parenthesisAccessOperator === undefined) {
      parseObject.Array.parenthesisAccessOperator = 1;
    } else {
      parseObject.Array.parenthesisAccessOperator += 1;
    }
  }
  if (
    element !== null &&
    typeof element === "object" &&
    !Array.isArray(element)
  ) {
    if (parseObject.Object.parenthesisAccessOperator === undefined) {
      parseObject.Object.parenthesisAccessOperator = 1;
    } else {
      parseObject.Object.parenthesisAccessOperator += 1;
    }
  }
  return element[index];
}
function lengthParse(element) {
  if (typeof element === "string") {
    if (parseObject.String.length === undefined) {
      parseObject.String.length = 1;
    } else {
      parseObject.String.length += 1;
    }
  }
  if (element instanceof Array) {
    if (parseObject.Array.length === undefined) {
      parseObject.Array.length = 1;
    } else {
      parseObject.Array.length += 1;
    }
  }
  return element.length;
}

function objectAssign(obj1, obj2) {
  if (parseObject.Object.assign === undefined) {
    parseObject.Object.assign = 1;
  } else {
    parseObject.Object.assign += 1;
  }
  return Object.assign(obj1, obj2);
}
function objectKeys(obj) {
  if (parseObject.Object.keys === undefined) {
    parseObject.Object.keys = 1;
  } else {
    parseObject.Object.keys += 1;
  }
  return Object.keys(obj);
}

function objectEntries(obj) {
  if (parseObject.Object.entries === undefined) {
    parseObject.Object.entries = 1;
  } else {
    parseObject.Object.entries += 1;
  }
  return Object.entries(obj);
}
function objectFreeze(obj) {
  if (parseObject.Object.freeze === undefined) {
    parseObject.Object.freeze = 1;
  } else {
    parseObject.Object.freeze += 1;
  }
  return Object.freeze(obj);
}
function objectSeal(obj) {
  if (parseObject.Object.seal === undefined) {
    parseObject.Object.seal = 1;
  } else {
    parseObject.Object.seal += 1;
  }
  return Object.seal(obj);
}
function objectHasOwn(obj, prop) {
  if (parseObject.Object.hasOwn === undefined) {
    parseObject.Object.hasOwn = 1;
  } else {
    parseObject.Object.hasOwn += 1;
  }
  return Object.hasOwn(obj, prop);
}

function sizeParse(obj) {
  if (obj instanceof Map) {
    if (parseObject.Map.size === undefined) {
      parseObject.Map.size = 1;
    } else {
      parseObject.Map.size += 1;
    }
  }
  if (obj instanceof Set) {
    if (parseObject.Set.size === undefined) {
      parseObject.Set.size = 1;
    } else {
      parseObject.Set.size += 1;
    }
  }

  return obj.size;
}
