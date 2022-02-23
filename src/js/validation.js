import ValidationError from './ValidationError';
import { MIN_CHARGE_INPUT, ERROR_MESSAGE } from './constants';

const validateCharge = (charge) => {
  if (!Number.isInteger(charge)) throw new ValidationError(ERROR_MESSAGE.INTEGER_CHARGE_INPUT);
  if (charge < MIN_CHARGE_INPUT) throw new ValidationError(ERROR_MESSAGE.MIN_CHARGE_INPUT);
}

export {
  validateCharge,
}