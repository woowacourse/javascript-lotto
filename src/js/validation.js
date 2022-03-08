import { MIN_CHARGE_INPUT, ERROR_MESSAGE, MAX_CHARGE_INPUT, LOTTERY_TICKET_NUMBER } from './constants/constants';

const hasDuplicates = arr => new Set(arr).size !== arr.length;
const isNotInteger = value => !Number.isInteger(value);

const isChargeOutOfRange = (charge) => charge < MIN_CHARGE_INPUT || charge > MAX_CHARGE_INPUT;

export const validateCharge = (charge) => {
  if (isNotInteger(charge))
    throw new Error(ERROR_MESSAGE.CHARGE_INPUT_NOT_INTEGER);
  if (isChargeOutOfRange(charge))
    throw new Error(ERROR_MESSAGE.CHARGE_INPUT_NOT_IN_RANGE);
}

const isWinningNumberOutOfRange = (winningNumber) => 
  winningNumber < LOTTERY_TICKET_NUMBER.MIN || winningNumber > LOTTERY_TICKET_NUMBER.MAX;

const isInsufficientInputNumber = (winningNumbers) => winningNumbers.length !== 7;
const someWinningNumber = (validateFunc) => (winningNumbers) => winningNumbers.some(validateFunc);
const hasNotIntegerNumber = someWinningNumber(number => isNotInteger(number));
const hasNumberOutOfRange = someWinningNumber(number => isWinningNumberOutOfRange(number));

export const validateWinningNumbers = (winningNumbers) => {
  if (isInsufficientInputNumber(winningNumbers))
    throw new Error(ERROR_MESSAGE.WINNING_NUMBERS_INSUFFICIENT)
  if (hasDuplicates(winningNumbers))
    throw new Error(ERROR_MESSAGE.WINNING_NUMBERS_DUPLICATED);
  if (hasNotIntegerNumber(winningNumbers))
    throw new Error(ERROR_MESSAGE.WINNING_NUMBERS_NOT_INTEGER);
  if (hasNumberOutOfRange(winningNumbers))
    throw new Error(ERROR_MESSAGE.WINNING_NUMBERS_NOT_IN_RANGE);
}
