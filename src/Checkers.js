export class ListChecker {
  static isDefineLength(list, value) {
    return list.length === value;
  }
}

export class StringChecker {
  static isRegString(string, regExp) {
    return regExp.test(string);
  }
}

export class NumberChecker {
  static isLessThan(number, value) {
    return number < value;
  }

  static isMoreThan(number, value) {
    return number > value;
  }
}
