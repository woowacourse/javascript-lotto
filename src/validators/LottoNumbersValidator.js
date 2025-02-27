import { LOTTO } from '../constants/Configurations.js';
import { ERROR_MESSAGE } from '../constants/Messages.js';
import { validateType, validateRange, validateCount } from './validate.js';

const validateTypeAll = (key, numbers) => {
  numbers.forEach((number) => {
    validateType(key, number);
  });
};

const validateRangeAll = (key, numbers) => {
  numbers.forEach((number) => {
    validateRange({
      key,
      value: number,
      min: LOTTO.MIN_NUMBER,
      max: LOTTO.MAX_NUMBER,
    });
  });
};

const validateDuplicate = (numbers) => {
  if (new Set(numbers).size !== numbers.length) {
    throw new Error(ERROR_MESSAGE.LOTTO.DUPLICATE);
  }
};

const LottoNumbersValidator = {
  validate: (key, numbers) => {
    validateTypeAll(key, numbers);
    validateCount(key, numbers);
    validateRangeAll(key, numbers);
  },
};

export {
  LottoNumbersValidator,
  validateTypeAll,
  validateRangeAll,
  validateDuplicate,
};
