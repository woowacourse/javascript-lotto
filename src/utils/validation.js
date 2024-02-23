import { LOTTO_RULES, REGEXP } from '../constant/constants.js';
import { ERROR_MESSAGES } from '../constant/messages.js';

const ValidationConditions = {
  hasCorrectLength(array, expectedLength) {
    return array.length === expectedLength;
  },

  isUnique(array) {
    const uniqueSet = new Set(array);

    return uniqueSet.size === array.length;
  },

  isWithinRange({ number, min, max }) {
    return min <= number && number <= max;
  },

  isAllNumbersInRange({ numbers, min, max }) {
    return numbers.every((number) => min <= number && number <= max);
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
    return string === LOTTO_RULES.restart || string === LOTTO_RULES.stop;
  },
};

export const validateLotto = (numbers) => {
  const { min_number, max_number } = LOTTO_RULES;

  if (!ValidationConditions.hasCorrectLength(numbers, LOTTO_RULES.length))
    throw new Error(ERROR_MESSAGES.incorrect_length);
  if (!ValidationConditions.isUnique(numbers)) throw new Error(ERROR_MESSAGES.duplicate);
  if (!ValidationConditions.isAllNumbersInRange({ numbers, min: min_number, max: max_number }))
    throw new Error(ERROR_MESSAGES.lotto_number_range);
};

export const validateBonusNumber = (numbers, bonusNumber) => {
  const { min_number, max_number } = LOTTO_RULES;

  if (!ValidationConditions.isWithinRange({ number: bonusNumber, min: min_number, max: max_number }))
    throw new Error(ERROR_MESSAGES.lotto_number_range);
  if (numbers.includes(bonusNumber)) throw new Error(ERROR_MESSAGES.bonus_number_duplicate);
};

export const validateCost = (cost) => {
  if (!ValidationConditions.isNumericPattern(cost)) throw new Error(ERROR_MESSAGES.positiveInteger);
  if (!ValidationConditions.isDivide(cost, LOTTO_RULES.cost)) throw new Error(ERROR_MESSAGES.divideThousand);
  if (!ValidationConditions.isGreaterThan(cost, LOTTO_RULES.cost)) throw new Error(ERROR_MESSAGES.greaterThanThousand);
};

export const validateNumber = (number) => {
  if (!ValidationConditions.isNumericPattern(number)) throw new Error(ERROR_MESSAGES.positiveInteger);
};

export const validateRestartResponse = (restartResponse) => {
  if (!ValidationConditions.isOnlyYorN(restartResponse)) throw new Error(ERROR_MESSAGES.only_y_or_n);
};
