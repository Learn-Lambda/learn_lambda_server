const parseObject = {
  String: {},
  Array: {},
  Object: {},
  Map: {},
  Set: {},
  Number: {},
  RegExp: {},
};

//${code_fn}

// String
const originalAt = String.prototype.at;
const charAt = String.prototype.charAt;
const charCodeAt = String.prototype.charCodeAt;
const codePointAt = String.prototype.codePointAt;
const concat = String.prototype.concat;
const endsWith = String.prototype.endsWith;
const stringIncludes = String.prototype.includes;
const indexOf = String.prototype.indexOf;
const lastIndexOf = String.prototype.lastIndexOf;
// const strLength = String.prototype.length;
const localeCompare = String.prototype.localeCompare;
const match = String.prototype.match;
const matchAll = String.prototype.matchAll;
const normalize = String.prototype.normalize;
const padEnd = String.prototype.padEnd;
const padStart = String.prototype.padStart;
const repeat = String.prototype.repeat;
const replace = String.prototype.replace;
// const replaceAll = String.prototype.replaceAll;
const search = String.prototype.search;
const slice = String.prototype.slice;
const split = String.prototype.split;
const startsWith = String.prototype.startsWith;
const substring = String.prototype.substring;
const toLocaleLowerCase = String.prototype.toLocaleLowerCase;
const toLocaleUpperCase = String.prototype.toLocaleUpperCase;
const toLowerCase = String.prototype.toLowerCase;
const toUpperCase = String.prototype.toUpperCase;
const trim = String.prototype.trim;
const trimEnd = String.prototype.trimEnd;
const trimStart = String.prototype.trimStart;

// Number
const numberToExponential = Number.prototype.toExponential;
const numberToFixed = Number.prototype.toFixed;
const numberToPrecision = Number.prototype.toPrecision;
// Array
const arrayAt = Array.prototype.at;
const arrayConcat = Array.prototype.concat;
const arrayCopyWithin = Array.prototype.copyWithin;
const arrayEntries = Array.prototype.entries;
const arrayEvery = Array.prototype.every;
const arrayFill = Array.prototype.fill;
const arrayFilter = Array.prototype.filter;
const arrayFind = Array.prototype.find;
const arrayFindIndex = Array.prototype.findIndex;
const arrayFlat = Array.prototype.flat;
const arrayFlatMap = Array.prototype.flatMap;
const arrayForEach = Array.prototype.forEach;
const arrayIncludes = Array.prototype.includes;
const arrayIndexOf = Array.prototype.indexOf;
const arrayJoin = Array.prototype.join;
const arrayKeys = Array.prototype.keys;
const arrayLastIndexOf = Array.prototype.lastIndexOf;
const arrayLenght = Array.prototype.length;
const arrayMap = Array.prototype.map;
const arrayPop = Array.prototype.pop;
const arrayPush = Array.prototype.push;
const arrayReduce = Array.prototype.reduce;
const arrayReduceRight = Array.prototype.reduceRight;
const arrayReverse = Array.prototype.reverse;
const arrayShift = Array.prototype.shift;
const arraySlice = Array.prototype.slice;
const arraySome = Array.prototype.some;
const arraySort = Array.prototype.sort;
const arraySplice = Array.prototype.splice;

const arrayUnshift = Array.prototype.unshift;
const arrayValues = Array.prototype.values;

// Map
const mapClear = Map.prototype.clear;
const mapDelete = Map.prototype.delete;
const mapEntries = Map.prototype.entries;
const mapForEach = Map.prototype.forEach;
const mapGet = Map.prototype.get;
const mapHas = Map.prototype.has;
const mapKeys = Map.prototype.keys;
const mapSet = Map.prototype.set;
// Set
const setAdd = Set.prototype.add;
const setClear = Set.prototype.clear;
const setDelete = Set.prototype.delete;
const setEntries = Set.prototype.entries;
const setForeach = Set.prototype.forEach;
const setHas = Set.prototype.has;
const setKeys = Set.prototype.keys;
// const setSize = Set.prototype.size;
const setValues = Set.prototype.values;

// RegExp
const regExpTest = RegExp.prototype.test;
const regExpExec = RegExp.prototype.exec;

String.prototype.at = function (pos) {
  if (parseObject.String.at === undefined) {
    parseObject.String.at = 1;
  } else {
    parseObject.String.at += 1;
  }
  return originalAt.call(this, pos);
};

String.prototype.charCodeAt = function (index) {
  if (parseObject.String.charCodeAt === undefined) {
    parseObject.String.charCodeAt = 1;
  } else {
    parseObject.String.charCodeAt += 1;
  }
  return charCodeAt.call(this, index);
};
String.prototype.codePointAt = function (pos) {
  if (parseObject.String.codePointAt === undefined) {
    parseObject.String.codePointAt = 1;
  } else {
    parseObject.String.codePointAt += 1;
  }
  return codePointAt.call(this, pos);
};

String.prototype.concat = function (strings) {
  if (parseObject.String.concat === undefined) {
    parseObject.String.concat = 1;
  } else {
    parseObject.String.concat += 1;
  }
  return concat.call(this, strings);
};
String.prototype.endsWith = function (searchString, endPosition) {
  if (parseObject.String.endsWith === undefined) {
    parseObject.String.endsWith = 1;
  } else {
    parseObject.String.endsWith += 1;
  }
  return endsWith.call(this, searchString, endPosition);
};
String.prototype.includes = function (searchString, position) {
  if (parseObject.String.includes === undefined) {
    parseObject.String.includes = 1;
  } else {
    parseObject.String.includes += 1;
  }
  return stringIncludes.call(this, searchString, position);
};
String.prototype.indexOf = function (searchString, position) {
  if (parseObject.String.indexOf === undefined) {
    parseObject.String.indexOf = 1;
  } else {
    parseObject.String.indexOf += 1;
  }
  return indexOf.call(this, searchString, position);
};
String.prototype.lastIndexOf = function (searchString, position) {
  if (parseObject.String.lastIndexOf === undefined) {
    parseObject.String.lastIndexOf = 1;
  } else {
    parseObject.String.lastIndexOf += 1;
  }
  return lastIndexOf.call(this, searchString, position);
};

String.prototype.localeCompare = function (that) {
  if (parseObject.String.localeCompare === undefined) {
    parseObject.String.localeCompare = 1;
  } else {
    parseObject.String.localeCompare += 1;
  }
  return localeCompare.call(this, that);
};
String.prototype.match = function (regexp) {
  if (parseObject.String.match === undefined) {
    parseObject.String.match = 1;
  } else {
    parseObject.String.match += 1;
  }
  const result = match.call(this, regexp);
  if (parseObject.RegExp.exec !== undefined) {
    parseObject.RegExp.exec -= 2;
  }
  return result;
};
String.prototype.charAt = function (pos) {
  if (parseObject.String.charAt === undefined) {
    parseObject.String.charAt = 1;
  } else {
    parseObject.String.charAt += 1;
  }
  return charAt.call(this, pos);
};
String.prototype.matchAll = function (regexp) {
  if (parseObject.String.matchAll === undefined) {
    parseObject.String.matchAll = 1;
  } else {
    parseObject.String.matchAll += 1;
  }
  return matchAll.call(this, regexp);
};
String.prototype.normalize = function (form) {
  if (parseObject.String.normalize === undefined) {
    parseObject.String.normalize = 1;
  } else {
    parseObject.String.normalize += 1;
  }
  return normalize.call(this, form);
};
String.prototype.padEnd = function (maxLength, fillString) {
  if (parseObject.String.padEnd === undefined) {
    parseObject.String.padEnd = 1;
  } else {
    parseObject.String.padEnd += 1;
  }
  return padEnd.call(this, maxLength, fillString);
};
String.prototype.padStart = function (maxLength, fillString) {
  if (parseObject.String.padStart === undefined) {
    parseObject.String.padStart = 1;
  } else {
    parseObject.String.padStart += 1;
  }
  return padStart.call(this, maxLength, fillString);
};
String.prototype.repeat = function (count) {
  if (parseObject.String.repeat === undefined) {
    parseObject.String.repeat = 1;
  } else {
    parseObject.String.repeat += 1;
  }
  return repeat.call(this, count);
};
// @ts-expect-error
String.prototype.replace = function (searchValue, replaceValue) {
  if (parseObject.String.replace === undefined) {
    parseObject.String.replace = 1;
  } else {
    parseObject.String.replace += 1;
  }
  return replace.call(this, searchValue, replaceValue);
};

String.prototype.replaceAll = function (searchValue, replacer) {
  if (parseObject.String.replaceAll === undefined) {
    parseObject.String.replaceAll = 1;
  } else {
    parseObject.String.replaceAll += 1;
  }
  return replaceAll.call(this, searchValue, replacer);
};
// @ts-expect-error
String.prototype.search = function (searcher) {
  if (parseObject.String.search === undefined) {
    parseObject.String.search = 1;
  } else {
    parseObject.String.search += 1;
  }
  return search.call(this, searcher);
};
String.prototype.slice = function (start, end) {
  if (parseObject.String.slice === undefined) {
    parseObject.String.slice = 1;
  } else {
    parseObject.String.slice += 1;
  }
  return slice.call(this, start, end);
};
// @ts-expect-error
String.prototype.split = function (splitter, limit) {
  if (parseObject.String.split === undefined) {
    parseObject.String.split = 1;
  } else {
    parseObject.String.split += 1;
  }
  return split.call(this, splitter, limit);
};
String.prototype.startsWith = function (searchString, position) {
  if (parseObject.String.startsWith === undefined) {
    parseObject.String.startsWith = 1;
  } else {
    parseObject.String.startsWith += 1;
  }
  return startsWith.call(this, searchString, position);
};
String.prototype.substring = function (start, end) {
  if (parseObject.String.substring === undefined) {
    parseObject.String.substring = 1;
  } else {
    parseObject.String.substring += 1;
  }
  return substring.call(this, start, end);
};
String.prototype.toLocaleLowerCase = function (locales) {
  if (parseObject.String.toLocaleLowerCase === undefined) {
    parseObject.String.toLocaleLowerCase = 1;
  } else {
    parseObject.String.toLocaleLowerCase += 1;
  }
  return toLocaleLowerCase.call(this, locales);
};
String.prototype.toLocaleUpperCase = function (locales) {
  if (parseObject.String.toLocaleUpperCase === undefined) {
    parseObject.String.toLocaleUpperCase = 1;
  } else {
    parseObject.String.toLocaleUpperCase += 1;
  }
  return toLocaleUpperCase.call(this, locales);
};
String.prototype.toLowerCase = function () {
  if (parseObject.String.toLowerCase === undefined) {
    parseObject.String.toLowerCase = 1;
  } else {
    parseObject.String.toLowerCase += 1;
  }
  return toLowerCase.call(this);
};

String.prototype.toUpperCase = function () {
  if (parseObject.String.toUpperCase === undefined) {
    parseObject.String.toUpperCase = 1;
  } else {
    parseObject.String.toUpperCase += 1;
  }
  return toUpperCase.call(this);
};
String.prototype.trim = function () {
  if (parseObject.String.trim === undefined) {
    parseObject.String.trim = 1;
  } else {
    parseObject.String.trim += 1;
  }
  return trim.call(this);
};
String.prototype.trimEnd = function () {
  if (parseObject.String.trimEnd === undefined) {
    parseObject.String.trimEnd = 1;
  } else {
    parseObject.String.trimEnd += 1;
  }
  return trimEnd.call(this);
};
String.prototype.trimStart = function () {
  if (parseObject.String.trimStart === undefined) {
    parseObject.String.trimStart = 1;
  } else {
    parseObject.String.trimStart += 1;
  }
  return trimStart.call(this);
};

Array.prototype.at = function (index) {
  if (parseObject.Array.at === undefined) {
    parseObject.Array.at = 1;
  } else {
    parseObject.Array.at += 1;
  }
  return arrayAt.call(this, index);
};

Array.prototype.concat = function (...items) {
  if (parseObject.Array.concat === undefined) {
    parseObject.Array.concat = 1;
  } else {
    parseObject.Array.concat += 1;
  }
  return arrayConcat.call(this, items);
};

Array.prototype.copyWithin = function (target, start, end) {
  if (parseObject.Array.copyWithin === undefined) {
    parseObject.Array.copyWithin = 1;
  } else {
    parseObject.Array.copyWithin += 1;
  }
  return arrayCopyWithin.call(this, target, start, end);
};

Array.prototype.entries = function () {
  if (parseObject.Array.entries === undefined) {
    parseObject.Array.entries = 1;
  } else {
    parseObject.Array.entries += 1;
  }
  return arrayEntries.call(this);
};

Array.prototype.every = function (predicate) {
  if (parseObject.Array.every === undefined) {
    parseObject.Array.every = 1;
  } else {
    parseObject.Array.every += 1;
  }
  return arrayEvery.call(this, predicate);
};

Array.prototype.fill = function (value, start, end) {
  if (parseObject.Array.fill === undefined) {
    parseObject.Array.fill = 1;
  } else {
    parseObject.Array.fill += 1;
  }
  return arrayFill.call(this, value, start, end);
};

Array.prototype.filter = function (predicate) {
  if (parseObject.Array.filter === undefined) {
    parseObject.Array.filter = 1;
  } else {
    parseObject.Array.filter += 1;
  }
  return arrayFilter.call(this, predicate);
};

Array.prototype.find = function (predicate) {
  if (parseObject.Array.find === undefined) {
    parseObject.Array.find = 1;
  } else {
    parseObject.Array.find += 1;
  }
  return arrayFind.call(this, predicate);
};

Array.prototype.findIndex = function (predicate) {
  if (parseObject.Array.findIndex === undefined) {
    parseObject.Array.findIndex = 1;
  } else {
    parseObject.Array.findIndex += 1;
  }
  return arrayFindIndex.call(this, predicate);
};

Array.prototype.flat = function (depth) {
  if (parseObject.Array.flat === undefined) {
    parseObject.Array.flat = 1;
  } else {
    parseObject.Array.flat += 1;
  }
  return arrayFlat.call(this, depth);
};

Array.prototype.flatMap = function (callback, arg) {
  if (parseObject.Array.flatMap === undefined) {
    parseObject.Array.flatMap = 1;
  } else {
    parseObject.Array.flatMap += 1;
  }
  return arrayFlat.call(this, callback, arg);
};

Array.prototype.forEach = function (callbackfn) {
  if (parseObject.Array.forEach === undefined) {
    parseObject.Array.forEach = 1;
  } else {
    parseObject.Array.forEach += 1;
  }
  return arrayForEach.call(this, callbackfn);
};

Array.prototype.includes = function (searchElement, fromIndex) {
  if (parseObject.Array.includes === undefined) {
    parseObject.Array.includes = 1;
  } else {
    parseObject.Array.includes += 1;
  }
  return arrayIncludes.call(this, searchElement, fromIndex);
};

Array.prototype.indexOf = function (searchElement, fromIndex) {
  if (parseObject.Array.indexOf === undefined) {
    parseObject.Array.indexOf = 1;
  } else {
    parseObject.Array.indexOf += 1;
  }
  return arrayIndexOf.call(this, searchElement, fromIndex);
};

Array.prototype.join = function (separator) {
  if (parseObject.Array.join === undefined) {
    parseObject.Array.join = 1;
  } else {
    parseObject.Array.join += 1;
  }
  return arrayJoin.call(this, separator);
};

Array.prototype.keys = function () {
  if (parseObject.Array.keys === undefined) {
    parseObject.Array.keys = 1;
  } else {
    parseObject.Array.keys += 1;
  }
  return arrayKeys.call(this);
};

Array.prototype.lastIndexOf = function (searchElement, fromIndex) {
  if (parseObject.Array.lastIndexOf === undefined) {
    parseObject.Array.lastIndexOf = 1;
  } else {
    parseObject.Array.lastIndexOf += 1;
  }
  return arrayLastIndexOf.call(this, searchElement, fromIndex);
};
Array.prototype.map = function (callbackfn) {
  if (parseObject.Array.map === undefined) {
    parseObject.Array.map = 1;
  } else {
    parseObject.Array.map += 1;
  }
  return arrayMap.call(this, callbackfn);
};

Array.prototype.pop = function () {
  if (parseObject.Array.pop === undefined) {
    parseObject.Array.pop = 1;
  } else {
    parseObject.Array.pop += 1;
  }
  return arrayPop.call(this);
};

Array.prototype.push = function (items) {
  //   console.log("PUSH");
  //   console.log(items)
  if (parseObject.Array.push === undefined) {
    parseObject.Array.push = 1;
  } else {
    parseObject.Array.push += 1;
  }
  return arrayPush.call(this, items);
};

Array.prototype.reduce = function (callbackfn) {
  if (parseObject.Array.reduce === undefined) {
    parseObject.Array.reduce = 1;
  } else {
    parseObject.Array.reduce += 1;
  }
  return arrayReduce.call(this, callbackfn);
};

Array.prototype.reduceRight = function (callbackfn) {
  if (parseObject.Array.reduceRight === undefined) {
    parseObject.Array.reduceRight = 1;
  } else {
    parseObject.Array.reduceRight += 1;
  }
  return arrayReduceRight.call(this, callbackfn);
};

Array.prototype.reverse = function () {
  if (parseObject.Array.reverse === undefined) {
    parseObject.Array.reverse = 1;
  } else {
    parseObject.Array.reverse += 1;
  }
  return arrayReverse.call(this);
};

Array.prototype.shift = function () {
  if (parseObject.Array.shift === undefined) {
    parseObject.Array.shift = 1;
  } else {
    parseObject.Array.shift += 1;
  }
  return arrayShift.call(this);
};

Array.prototype.slice = function (start, end) {
  if (parseObject.Array.slice === undefined) {
    parseObject.Array.slice = 1;
  } else {
    parseObject.Array.slice += 1;
  }
  return arraySlice.call(this, start, end);
};

Array.prototype.some = function (predicate) {
  if (parseObject.Array.some === undefined) {
    parseObject.Array.some = 1;
  } else {
    parseObject.Array.some += 1;
  }
  return arraySome.call(this, predicate);
};

Array.prototype.sort = function (compareFn) {
  if (parseObject.Array.sort === undefined) {
    parseObject.Array.sort = 1;
  } else {
    parseObject.Array.sort += 1;
  }
  return arraySort.call(this, compareFn);
};

Array.prototype.splice = function (start, deleteCount) {
  if (parseObject.Array.splice === undefined) {
    parseObject.Array.splice = 1;
  } else {
    parseObject.Array.splice += 1;
  }
  return arraySplice.call(this, start, deleteCount);
};

Array.prototype.unshift = function (...items) {
  if (parseObject.Array.unshift === undefined) {
    parseObject.Array.unshift = 1;
  } else {
    parseObject.Array.unshift += 1;
  }
  return arrayUnshift.call(items);
};

Array.prototype.values = function () {
  if (parseObject.Array.values === undefined) {
    parseObject.Array.values = 1;
  } else {
    parseObject.Array.values += 1;
  }
  return arrayValues.call(this);
};

Number.prototype.toExponential = function () {
  if (parseObject.Number.toExponential === undefined) {
    parseObject.Number.toExponential = 1;
  } else {
    parseObject.Number.toExponential += 1;
  }
  return numberToExponential.call(this);
};

Number.prototype.toFixed = function () {
  if (parseObject.Number.toFixed === undefined) {
    parseObject.Number.toFixed = 1;
  } else {
    parseObject.Number.toFixed += 1;
  }
  return numberToFixed.call(this);
};

Number.prototype.toPrecision = function () {
  if (parseObject.Number.toPrecision === undefined) {
    parseObject.Number.toPrecision = 1;
  } else {
    parseObject.Number.toPrecision += 1;
  }
  return numberToPrecision.call(this);
};
RegExp.prototype.test = function (arg) {
  if (parseObject.RegExp.test === undefined) {
    parseObject.RegExp.test = 1;
    parseObject.RegExp.exec;
  } else {
    parseObject.RegExp.test += 1;
  }
  const result = regExpTest.call(this, arg);
  if (parseObject.RegExp.exec !== undefined) {
    parseObject.RegExp.exec -= 1;
  }
  return result;
};
RegExp.prototype.exec = function (arg) {
  if (parseObject.RegExp.exec === undefined) {
    parseObject.RegExp.exec = 1;
  } else {
    parseObject.RegExp.exec += 1;
  }
  return regExpExec.call(this, arg);
};

Map.prototype.clear = function () {
  if (parseObject.Map.clear === undefined) {
    parseObject.Map.clear = 1;
  } else {
    parseObject.Map.clear += 1;
  }
  return mapClear.call(this);
};
Map.prototype.delete = function (arg) {
  if (parseObject.Map.delete === undefined) {
    parseObject.Map.delete = 1;
  } else {
    parseObject.Map.delete += 1;
  }
  return mapDelete.call(this, arg);
};
Map.prototype.entries = function () {
  if (parseObject.Map.entries === undefined) {
    parseObject.Map.entries = 1;
  } else {
    parseObject.Map.entries += 1;
  }
  return mapEntries.call(this);
};
Map.prototype.forEach = function (arg) {
  if (parseObject.Map.forEach === undefined) {
    parseObject.Map.forEach = 1;
  } else {
    parseObject.Map.forEach += 1;
  }
  return mapForEach.call(this, arg);
};
Map.prototype.get = function (arg) {
  if (parseObject.Map.get === undefined) {
    parseObject.Map.get = 1;
  } else {
    parseObject.Map.get += 1;
  }
  return mapGet.call(this, arg);
};
Map.prototype.has = function (arg) {
  if (parseObject.Map.has === undefined) {
    parseObject.Map.has = 1;
  } else {
    parseObject.Map.has += 1;
  }
  return mapHas.call(this, arg);
};
Map.prototype.keys = function () {
  if (parseObject.Map.keys === undefined) {
    parseObject.Map.keys = 1;
  } else {
    parseObject.Map.keys += 1;
  }
  return mapKeys.call(this);
};
Map.prototype.set = function (arg, arg2) {
  if (parseObject.Map.set === undefined) {
    parseObject.Map.set = 1;
  } else {
    parseObject.Map.set += 1;
  }
  return mapSet.call(this, arg, arg2);
};
Set.prototype.add = function (arg) {
  if (parseObject.Set.add === undefined) {
    parseObject.Set.add = 1;
  } else {
    parseObject.Set.add += 1;
  }
  return setAdd.call(this, arg);
};
Set.prototype.clear = function () {
  if (parseObject.Set.clear === undefined) {
    parseObject.Set.clear = 1;
  } else {
    parseObject.Set.clear += 1;
  }
  return setClear.call(this);
};
Set.prototype.delete = function (arg) {
  if (parseObject.Set.delete === undefined) {
    parseObject.Set.delete = 1;
  } else {
    parseObject.Set.delete += 1;
  }
  return setDelete.call(this, arg);
};
Set.prototype.entries = function () {
  if (parseObject.Set.entries === undefined) {
    parseObject.Set.entries = 1;
  } else {
    parseObject.Set.entries += 1;
  }
  return setEntries.call(this);
};
Set.prototype.forEach = function (arg) {
  if (parseObject.Set.forEach === undefined) {
    parseObject.Set.forEach = 1;
  } else {
    parseObject.Set.forEach += 1;
  }
  return setForeach.call(this, arg);
};
Set.prototype.has = function (arg) {
  if (parseObject.Set.has === undefined) {
    parseObject.Set.has = 1;
  } else {
    parseObject.Set.has += 1;
  }
  return setHas.call(this, arg);
};
Set.prototype.keys = function () {
  if (parseObject.Set.keys === undefined) {
    parseObject.Set.keys = 1;
  } else {
    parseObject.Set.keys += 1;
  }
  return setKeys.call(this);
};
Set.prototype.values = function () {
  if (parseObject.Set.values === undefined) {
    parseObject.Set.values = 1;
  } else {
    parseObject.Set.values += 1;
  }
  return setValues.call(this);
};
//${code}

console.log({ parseObject: parseObject });
