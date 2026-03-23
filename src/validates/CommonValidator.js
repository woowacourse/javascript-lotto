import { LOTTO_MAX_NUMBER, LOTTO_MIN_NUMBER } from "../constants/config.js";

export function commonValidate(input) {
  if (isInputEmpty(input)) return false;
  if (!isPositiveInteger(input)) return false;
  if (!isNumberInRange(input)) return false;
  return true;
}

export function isInputEmpty(input) {
  return input === "";
}

export function isPositiveInteger(input) {
  return /^[1-9]\d*$/.test(input);
}

function isNumberInRange(input) {
  return Number(input) >= LOTTO_MIN_NUMBER && Number(input) <= LOTTO_MAX_NUMBER;
}
