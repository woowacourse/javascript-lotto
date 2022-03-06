import ValidationError from './utils/ValidationError';
import { LOTTO_PRICE, ERROR_MESSAGE, LOTTO_NUMBER, MAX_CHARGE_INPUT } from './constants/constants';

export function validateCharge(charge) {
  if (!Number.isInteger(charge)) throw new ValidationError(ERROR_MESSAGE.INTEGER_CHARGE_INPUT);
  if (charge < LOTTO_PRICE) throw new ValidationError(ERROR_MESSAGE.MIN_CHARGE_INPUT);
  if (charge > MAX_CHARGE_INPUT) throw new ValidationError(ERROR_MESSAGE.MAX_CHARGE_INPUT);
}

export function validateWinnerNumbers(winnerNumbers) {
  [...winnerNumbers].forEach(winnerNumber => {
    if (!Number.isInteger(winnerNumber)) throw new ValidationError(ERROR_MESSAGE.INTEGER_WINNER_NUMBER);
    if (winnerNumber < LOTTO_NUMBER.MIN || winnerNumber > LOTTO_NUMBER.MAX)
      throw new ValidationError(ERROR_MESSAGE.RANGE_OF_WINNER_NUMBER);
  });
  if (winnerNumbers.size !== LOTTO_NUMBER.LENGTH + LOTTO_NUMBER.BONUS_NUMBER_LENGTH)
    throw new ValidationError(ERROR_MESSAGE.NON_DUPLICATE_WINNER_NUMBERS);
}
