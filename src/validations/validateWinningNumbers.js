import {
  WINNING_NUMBERS_ERROR_MESSAGES,
  LOTTO_LENGTH,
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
} from "../constants/constants.js";

const validateWinningNumbers = (input) => {
  const winningNumbers = input
    .split(",")
    .map((el) => el.trim())
    .filter((el) => el !== "")
    .map(Number);

  if (winningNumbers.length !== LOTTO_LENGTH) {
    throw new Error(WINNING_NUMBERS_ERROR_MESSAGES.INVALID_COUNT);
  }

  winningNumbers.forEach((winningNumber) => {
    if (Number.isNaN(winningNumber)) {
      throw new Error(WINNING_NUMBERS_ERROR_MESSAGES.NOT_A_NUMBER);
    }
    if (!Number.isInteger(winningNumber)) {
      throw new Error(WINNING_NUMBERS_ERROR_MESSAGES.NOT_AN_INTEGER);
    }
    if (MIN_LOTTO_NUMBER > winningNumber || MAX_LOTTO_NUMBER < winningNumber) {
      throw new Error(WINNING_NUMBERS_ERROR_MESSAGES.OUT_OF_RANGE);
    }
  });

  const winningNumbersSet = new Set(winningNumbers);
  if (winningNumbers.length !== winningNumbersSet.size) {
    throw new Error(WINNING_NUMBERS_ERROR_MESSAGES.DUPLICATE_NUMBER);
  }

  return winningNumbers;
};

export default validateWinningNumbers;
