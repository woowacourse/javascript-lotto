const ValidationUtils = {
  isEmpty: (string) => string.trim().length === 0,
  isCorrectedArrayLength: (array, min, max) =>
    array.length < min || array.length > max,
  isDuplicatedNumber: (array) => new Set(array).size !== array.length,
  isArrayNumberRangeOver: (numbers, min, max) =>
    numbers.some((number) =>
      ValidationUtils.isNumberRangeOver(number, min, max)
    ),
  isNotNaturalNumberInArray: (numbers) =>
    numbers.some((number) => ValidationUtils.isNotNaturalNumber(number)),
  isNumberRangeOver: (number, min, max) => number < min || number > max,
  isNotNaturalNumber: (number) => number % 1 !== 0 || number < 1,
  isDuplicated: (array, element) =>
    new Set([...array, element]).length !== array.length + 1,
  isNotMultiple: (number, unit) => number % unit !== 0,
};

const Validator = {
  userInput: (string) => {
    const errorResults = {
      IS_EMPTY: ValidationUtils.isEmpty(string),
    };

    return errorResults;
  },
  winningNumbers: (numbers) => {
    const errorResults = {
      IS_WRONG_ARRAY_LENGTH: ValidationUtils.isCorrectedArrayLength(
        numbers,
        6,
        6
      ),
      IS_DUPLICATED_NUMBER: ValidationUtils.isDuplicatedNumber(numbers),
      IS_ARRAY_NUMBER_RANGE_OVER: ValidationUtils.isArrayNumberRangeOver(
        numbers,
        1,
        45
      ),
      IS_NOT_NATURAL_NUMBER_IN_ARRAY:
        ValidationUtils.isNotNaturalNumberInArray(numbers),
    };

    return errorResults;
  },
  bonusNumber: (number) => {
    const errorResults = {
      IS_NUMBER_RANGE_OVER: ValidationUtils.isNumberRangeOver(number, 1, 45),
      IS_NOT_NATURAL_NUMBER: ValidationUtils.isNotNaturalNumber(number),
    };

    return errorResults;
  },
  winningsAndBonus: (winningNumbers, bonusNumber) => {
    const errorResults = {
      IS_DUPLICATED: ValidationUtils.isDuplicated(winningNumbers, bonusNumber),
    };

    return errorResults;
  },
  purchasePrice: (purchasePrice) => {
    const errorResults = {
      IS_NUMBER_RANGE_OVER: ValidationUtils.isNumberRangeOver(
        purchasePrice,
        1000,
        10000000000
      ),
      IS_NOT_MULTIPLE: ValidationUtils.isNotMultiple(purchasePrice, 1000),
    };

    return errorResults;
  },
};

export default Validator;
