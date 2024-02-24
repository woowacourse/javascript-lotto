import { ERROR_MESSAGE } from "../constants/messages.js";

export const validateTypeInteger = (value) => {
  if (!Number.isInteger(value)) {
    throw new Error(ERROR_MESSAGE.notInteger);
  }
};

export const validateUniqueElements = (array) => {
  if (array.length !== new Set(array).size) {
    throw new Error(ERROR_MESSAGE.hasDuplicateElements);
  }
};

export const validateLengthEqual = (length, comparedLength) => {
  if (length !== comparedLength) {
    throw new Error(ERROR_MESSAGE.invalidLottoNumbersLength);
  }
};
