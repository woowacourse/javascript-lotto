import { LOTTO_RULES, ERROR_MESSAGES, REGEXP, CONSTANTS } from '../constant/index.js';

const Validations = {
  isCorrectLength(numbers) {
    return numbers.length === LOTTO_RULES.length;
  },

  isDuplicate(array) {
    const uniqueArray = new Set(array);

    return uniqueArray.size !== array.length;
  },

  isCorrectRange(number) {
    return LOTTO_RULES.min_number <= number && number <= LOTTO_RULES.max_number;
  },

  isNumericPattern(number) {
    return REGEXP.numericPattern.test(number);
  },

  isDivide(dividend, divisor) {
    return dividend % divisor === 0;
  },

  isGreaterThan(number, threshold) {
    return number >= threshold;
  },

  isOnlyYorN(string) {
    return string === CONSTANTS.yes || string === CONSTANTS.no;
  },
};

export const validateLotto = (numbers) => {
  if (!Validations.isCorrectLength(numbers)) throw new Error(ERROR_MESSAGES.incorrect_length);
  if (Validations.isDuplicate(numbers)) throw new Error(ERROR_MESSAGES.duplicate);
  numbers.forEach((number) => {
    if (!Validations.isCorrectRange(number)) throw new Error(ERROR_MESSAGES.lotto_number_range);
  });
};

export const validateBonusNumber = (numbers, bonusNumber) => {
  if (!Validations.isCorrectRange(bonusNumber)) throw new Error(ERROR_MESSAGES.lotto_number_range);
  if (numbers.includes(bonusNumber)) throw new Error(ERROR_MESSAGES.bonus_number_duplicate);
};

export const validateCost = (cost) => {
  if (!Validations.isNumericPattern(cost)) throw new Error(ERROR_MESSAGES.positiveInteger);
  if (!Validations.isDivide(cost, LOTTO_RULES.cost)) throw new Error(ERROR_MESSAGES.divideThousand);
  if (!Validations.isGreaterThan(cost, LOTTO_RULES.cost)) throw new Error(ERROR_MESSAGES.greaterThanThousand);
};

export const validateRestartResponse = (restartResponse) => {
  if (!Validations.isOnlyYorN(restartResponse)) throw new Error(ERROR_MESSAGES.only_y_or_n);
};
