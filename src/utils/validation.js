import { LOTTO_RULES, ERROR_MESSAGES } from '../constant/index.js';

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
    return /^\d+$/.test(number);
  },

  isDivide(dividend, divisor) {
    return dividend % divisor === 0;
  },

  isGreaterThan(number, threshold) {
    return number >= threshold;
  },

  isOnlyYorN(string) {
    return string === 'y' || string === 'n';
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
  if (numbers.includes(bonusNumber)) throw new Error('보너스 번호는 당첨번호와 중복되지 않아야 합니다.');
};

export const validateCost = (cost) => {
  if (!Validations.isNumericPattern(cost)) throw new Error('양의 정수를 입력해주세요');
  if (!Validations.isDivide(cost, 1000)) throw new Error('1000원 단위로 입력가능합니다.');
  if (!Validations.isGreaterThan(cost, 1000)) throw new Error('1000원 이상의 금액을 입력해주세요.');
};

export const validateRestartResponse = (restartResponse) => {
  if (!Validations.isOnlyYorN(restartResponse)) throw new Error('y 또는 n만 입력 가능합니다.');
};
