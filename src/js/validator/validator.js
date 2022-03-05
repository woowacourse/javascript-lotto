import { LOTTO, MONEY_INPUT } from '../constants/constants';
import { winningNumber } from '../model/winningNumber';

export const isInvalidMoneyInput = (money) => {
  return money % MONEY_INPUT.MIN_PRICE !== 0 || money < MONEY_INPUT.MIN_PRICE || money > MONEY_INPUT.MAX_PRICE;
};

const isDuplicateWinningNumber = (winningNumber) => {
  return new Set(winningNumber).size !== LOTTO.WINNING_NUMBER_LENGTH;
};

const isOverRangeWinningNumber = (winningNumber) => {
  return winningNumber.some((number) => number < LOTTO.MIN_NUMBER || number > LOTTO.MAX_NUMBER);
};

export const isInvalidWinningNumberInput = (winningNumber) => {
  return isDuplicateWinningNumber(winningNumber) || isOverRangeWinningNumber(winningNumber);
};
