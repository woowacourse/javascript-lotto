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
