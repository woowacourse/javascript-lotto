import readLineAsync from './readLineAsync.js';
import { INPUT_MESSAGE } from './Constant/query.js';

export const getPurchaseAmountInput = () => {
  return readLineAsync(INPUT_MESSAGE.PURCHASE_AMOUNT);
};

export const getWinningNumbersInput = () => {
  return readLineAsync(INPUT_MESSAGE.WINNING_NUMBERS);
};

export const getBonusNumberInput = () => {
  return readLineAsync(INPUT_MESSAGE.BONUS_NUMBER);
};

export const getRetryInput = () => {
  return readLineAsync(INPUT_MESSAGE.RETRY);
};
