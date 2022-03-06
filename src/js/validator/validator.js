import { LOTTO, MONEY_INPUT } from '../constants/constants';
import { winningNumber } from '../model/winningNumber';

export const isInvalidMoneyInput = (money) => {
  return money % MONEY_INPUT.MIN_PRICE !== 0 || money < MONEY_INPUT.MIN_PRICE || money > MONEY_INPUT.MAX_PRICE;
};

const isDuplicateWinningNumbers = (winningNumbers) => {
  return new Set(winningNumbers).size !== LOTTO.WINNING_NUMBER_LENGTH;
};

const isOverRangeWinningNumbers = (winningNumbers) => {
  return winningNumbers.some((number) => number < LOTTO.MIN_NUMBER || number > LOTTO.MAX_NUMBER);
};

export const isInvalidWinningNumbersInput = (winningNumbers) => {
  return isDuplicateWinningNumbers(winningNumbers) || isOverRangeWinningNumbers(winningNumbers);
};
