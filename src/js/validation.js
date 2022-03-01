import { MIN_CHARGE_INPUT, ERROR_MESSAGE, MAX_CHARGE_INPUT } from './constants/constants';

function isChargeValueInValidRange(value) {
  return MIN_CHARGE_INPUT <= value && value <= MAX_CHARGE_INPUT;
}

export default function validateCharge(charge) {
  if (!Number.isInteger(charge))
    throw new Error(ERROR_MESSAGE.CHARGE_INPUT_NOT_INTEGER);
  if (!isChargeValueInValidRange(charge))
    throw new Error(ERROR_MESSAGE.CHARGE_INPUT_NOT_IN_RANGE);
}
