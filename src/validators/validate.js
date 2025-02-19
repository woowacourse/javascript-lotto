import { LOTTO } from "../constants/CONFIGURATIONS.js";
import { ERROR_MESSAGE } from "../constants/MESSAGES.js";

const validateType = (key, value) => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new Error(ERROR_MESSAGE.COMMON.INVALID_TYPE(key));
  }
};

const validateRange = ({ key, value, min, max }) => {
  if (value < min || value > max) {
    throw new Error(ERROR_MESSAGE.COMMON.INVALID_RANGE({ key, min, max }));
  }
};

const validateCount = (key, value) => {
  if (value.length !== LOTTO.LENGTH) {
    throw new Error(ERROR_MESSAGE.COMMON.INVALID_COUNT(key));
  }
};

export { validateType, validateRange, validateCount };
