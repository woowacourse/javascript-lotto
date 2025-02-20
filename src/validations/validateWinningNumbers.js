import {
  WINNING_NUMBERS_ERROR_MESSAGES,
  LOTTO_LENGTH,
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
} from "../constants/constants.js";
import throwIfInvalid from "../utils/throwIfInvalid.js";

const parseWinningNumbers = (input) => {
  return input
    .split(",")
    .map((el) => el.trim())
    .filter((el) => el !== "")
    .map(Number);
};

const checkLength = (winningNumbers) => {
  throwIfInvalid(
    winningNumbers.length !== LOTTO_LENGTH,
    WINNING_NUMBERS_ERROR_MESSAGES.INVALID_COUNT,
  );
};

const checkIsNumber = (winningNumber) => {
  throwIfInvalid(
    Number.isNaN(winningNumber),
    WINNING_NUMBERS_ERROR_MESSAGES.NOT_A_NUMBER,
  );
};

const chechIsInteger = (winningNumber) => {
  throwIfInvalid(
    !Number.isInteger(winningNumber),
    WINNING_NUMBERS_ERROR_MESSAGES.NOT_AN_INTEGER,
  );
};

const checkIsInRange = (winningNumber) => {
  throwIfInvalid(
    MIN_LOTTO_NUMBER > winningNumber || MAX_LOTTO_NUMBER < winningNumber,
    WINNING_NUMBERS_ERROR_MESSAGES.OUT_OF_RANGE,
  );
};

const checkIsNotDuplicate = (winningNumbers, winningNumbersSet) => {
  throwIfInvalid(
    winningNumbers.length !== winningNumbersSet.size,
    WINNING_NUMBERS_ERROR_MESSAGES.DUPLICATE_NUMBER,
  );
};

const validateWinningNumbers = (input) => {
  const winningNumbers = parseWinningNumbers(input);
  checkLength(winningNumbers);

  winningNumbers.forEach((winningNumber) => {
    checkIsNumber(winningNumber);
    chechIsInteger(winningNumber);
    checkIsInRange(winningNumber);
  });

  const winningNumbersSet = new Set(winningNumbers);
  checkIsNotDuplicate(winningNumbers, winningNumbersSet);

  return winningNumbers;
};

export default validateWinningNumbers;
