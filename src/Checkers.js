export class ListChecker {
  static isDefineLength(list, value) {
    return list.length === value;
  }

  static hasDuplicateValue(list) {
    const set = new Set(list);
    return list.length !== set.size;
  }

  static isUphillList(list) {
    return list.every((element, i) => i === 0 || list[i - 1] < element);
  }

  static includeValue(targetList, values) {
    const isInclude = targetList.includes(values);
    return isInclude;
  }
}

export class StringChecker {
  static isRegString(string, regExp) {
    return regExp.test(string);
  }

  static isExactString(string, value) {
    return string === value;
  }
}

export class NumberChecker {
  static isLessThan(number, value) {
    return number < value;
  }

  static isMoreThan(number, value) {
    return number > value;
  }

  static isUnitNumber(number, unit) {
    return number % unit === 0;
  }
}
