import ERROR_MESSAGE from "../../constants/ERROR_MESSAGE.js";
import Parser from "../../utils/Parser.js";
import Validator from "../../utils/Validator.js";

const parseAndValidateWinningNumbers = (input) => {
  const winningNumbers = Parser.splitWinningNumbers(input);

  if (Validator.isFormat(winningNumbers)) throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS_FORMAT);
  if (Validator.isMaxLength(winningNumbers)) throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS_COUNT);
  if (Validator.isNotNumber(winningNumbers)) throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS_TYPE);
  if (Validator.isWinningNumbersRange(winningNumbers)) throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS_RANGE);
  if (Validator.isDuplicate(winningNumbers)) throw new Error(ERROR_MESSAGE.DUPLICATE_WINNING_NUMBERS);

  return winningNumbers;
};
export default parseAndValidateWinningNumbers;
