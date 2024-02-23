import MESSAGES from "../constants/messages.js";

export const validateTypeInteger = (value) => {
  if (!Number.isInteger(value)) {
    throw new Error(MESSAGES.ERROR.notInteger);
  }
};

export const validateUniqueElements = (array) => {
  if (array.length !== new Set(array).size) {
    throw new Error(MESSAGES.ERROR.hasDuplicateElements);
  }
};

export const validateLengthEqual = (length, comparedLength) => {
  if (length !== comparedLength) {
    throw new Error(MESSAGES.ERROR.invalidLottoNumbersLength);
  }
};
