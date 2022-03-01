import { MIN_CHARGE_INPUT, ERROR_MESSAGE, MAX_CHARGE_INPUT } from './constants/constants';

const isChargeWithinValidRange = (charge) => MIN_CHARGE_INPUT <= charge && charge <= MAX_CHARGE_INPUT;

const isWinningNumberWithinValidRange = (winningNumber) => winningNumber >= 1 && winningNumber <= 45;

export const validateCharge = (charge) => {
  if (!Number.isInteger(charge))
    throw new Error(ERROR_MESSAGE.CHARGE_INPUT_NOT_INTEGER);
  if (!isChargeWithinValidRange(charge))
    throw new Error(ERROR_MESSAGE.CHARGE_INPUT_NOT_IN_RANGE);
}

export const validateWinningNumbers = (winningNumbers) => {
  if (winningNumbers.length !== 7)
    throw new Error(ERROR_MESSAGE.WINNING_NUMBERS_INSUFFICIENT)
  if (winningNumbers.some((number) => !Number.isInteger(number)))
    throw new Error(ERROR_MESSAGE.WINNING_NUMBERS_NOT_INTEGER);
  if (winningNumbers.some((number) => !isWinningNumberWithinValidRange(number)))
    throw new Error(ERROR_MESSAGE.WINNING_NUMBERS_NOT_IN_RANGE);
}


