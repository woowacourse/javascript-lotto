import { CustomError, ERROR_CODE } from '../utils/Error.js';

export default function checkUnit(amount, unit) {
  if (amount % unit !== 0) {
    throw new CustomError({ code: ERROR_CODE.INVALID_AMOUNT_UNIT, payload: { unit } }, amount);
  }
}
