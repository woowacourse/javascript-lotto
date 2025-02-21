import ERROR_MESSAGE from "../../constants/ERROR_MESSAGE.js";
import { LOTTO_NUMBER_SPLITER } from "../../constants/constant.js";
import Validator from "../../utils/Validator.js";

const validateWinningNumbers = (input) => {
  const winningNumbers = input.split(LOTTO_NUMBER_SPLITER).map((number) => Number(number.trim()));
  if (Validator.isFormat(winningNumbers)) throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS_FORMAT);
  if (Validator.isMaxLength(winningNumbers)) throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS_COUNT);
  if (Validator.isNotNumber(winningNumbers)) throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS_TYPE);
  if (Validator.isWinningNumbersRange(winningNumbers)) throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS_RANGE);
  if (Validator.isDuplicate(winningNumbers)) throw new Error(ERROR_MESSAGE.DUPLICATE_WINNING_NUMBERS);

  return winningNumbers;
};
export default validateWinningNumbers;
