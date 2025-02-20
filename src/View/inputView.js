import readLineAsync from './readLineAsync.js';
import { INPUT_MESSAGE } from './Constant/query.js';

export const getPurchaseAmountInput = () => {
  return readLineAsync(INPUT_MESSAGE.PURCHASE_AMOUNT);
};

export const getWinningNumbersInput = () => {
  return readLineAsync(INPUT_MESSAGE.WINNING_NUMBERS);
};

