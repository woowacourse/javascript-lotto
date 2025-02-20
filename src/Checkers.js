export class ListChecker {
  static isDefineLength(list, value) {
    return list.length === value;
  }

  static hasDuplicateValue(list) {
    const set = new Set(list);
    return list.length !== set.size;
  }

  static isUphillList(list) {
    let currentMaxNum = 0;
    for (let i = 0; i < list.length; i += 1) {
      if (currentMaxNum >= list[i]) return false;
      currentMaxNum = list[i];
    }

    return true;
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
