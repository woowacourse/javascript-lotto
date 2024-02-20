import { LOTTO_RULES, ERROR_MESSAGES } from '../constant/index.js';

const Validations = {
  isCorrectLength(numbers) {
    return numbers.length === LOTTO_RULES.length;
  },

  isDuplicate(array) {
    const uniqueArray = new Set(array);

    return uniqueArray.size !== array.length;
  },
};

export const validateLotto = (numbers) => {
  if (!Validations.isCorrectLength(numbers)) throw new Error(ERROR_MESSAGES.incorrect_length);
  if (Validations.isDuplicate(numbers)) throw new Error(ERROR_MESSAGES.duplicate);
};
