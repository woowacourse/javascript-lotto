import { ERROR_MESSAGE } from "../constants/error.js";

export const isNumber = (input) => {
  const regex = /^[0-9]*$/;

  if (!regex.test(input)) {
    throw new Error(ERROR_MESSAGE.INVALID_NUMBER);
  }
};

export const isThousandUnit = (input) => {
  if (input % 1000 !== 0) {
    throw new Error(ERROR_MESSAGE.INVALID_THOUSAND_UNIT);
  }
};
