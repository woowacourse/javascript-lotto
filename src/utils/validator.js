const validator = {
  checkDigit(string) {
    if (string !== '0' && !/^[1-9][0-9]*$/.test(string)) {
      throw new Error('정수여야 합니다. (01, 1.0, +1 불가능)');
    }
  },

  checkGreaterThanOrEqualMin(number, min) {
    if (number < min) throw new Error(`${min} 이상의 수여야 합니다.`);
  },

  checkLessThanOrEqualMax(number, max) {
    if (number > max) throw new Error(`${max} 이하의 수여야 합니다.`);
  },

  checkDivideIntoUnit(number, unit) {
    if (number % unit !== 0) throw new Error(`${unit}에 나누어 떨어지는 수여야 합니다.`);
  },

  checkDuplication(array) {
    if (new Set(array).size !== array.length) throw new Error('중복이 없어야 합니다.');
  },

  checkArrayLength(array, length) {
    if (array.length !== length) throw new Error(`길이는 ${length}여야 합니다.`);
  },

  checkIncludes(value, array) {
    if (!array.includes(value)) throw new Error(`${array}중 하나의 값이어야 합니다.`);
  },
};

export default validator;
