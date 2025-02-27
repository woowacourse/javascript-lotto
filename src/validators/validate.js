<<<<<<< HEAD
import { LOTTO } from '../constants/Configurations.js';
import { ERROR_MESSAGE } from '../constants/Messages.js';
=======
import { LOTTO } from '../constants/CONFIGURATIONS.js';
import { ERROR_MESSAGE } from '../constants/MESSAGES.js';
>>>>>>> 0f9ff21ed0cd6104c06a2b5d22feb4bc389fa693

const validateType = (key, value) => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new Error(ERROR_MESSAGE.COMMON.INVALID_TYPE(key));
  }
};

const validateRange = ({ key, value, min, max }) => {
  if (value < min || value > max) {
    throw new Error(
      ERROR_MESSAGE.COMMON.INVALID_RANGE({
        key,
        min,
        max,
      }),
    );
  }
};

const validateCount = (key, value) => {
  if (value.length !== LOTTO.LENGTH) {
    throw new Error(ERROR_MESSAGE.COMMON.INVALID_COUNT(key));
  }
};

export { validateType, validateRange, validateCount };
