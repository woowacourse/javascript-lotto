import { ERROR } from '../constant/index.js';

export default function checkUnit(amount, unit) {
  if (amount % unit !== 0) {
    throw new Error(ERROR.INVALID_AMOUNT_UNIT(unit));
  }
}
