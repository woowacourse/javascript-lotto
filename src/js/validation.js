import ValidationError from './utils/ValidationError';
import { LOTTO_PRICE, ERROR_MESSAGE } from './constants/constants';

export default function validateCharge(charge) {
  if (!Number.isInteger(charge)) throw new ValidationError(ERROR_MESSAGE.INTEGER_CHARGE_INPUT);
  if (charge < LOTTO_PRICE) throw new ValidationError(ERROR_MESSAGE.MIN_CHARGE_INPUT);
}
