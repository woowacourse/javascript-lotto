import { ERROR } from "../constants/message.js";
import { throwError } from "../utils/throwError.js";

export const validateEmpty = (input) => {
  if (input === "") throwError(ERROR.EMPTY);
};

export const validateNumber = (input) => {
  if (isNaN(Number(input))) throwError(ERROR.NOT_NUMBER);
};

export const validateRange = ({ min, max }, input) => {
  if (input < min || input > max) throwError(ERROR.INVALID_RANGE);
};
