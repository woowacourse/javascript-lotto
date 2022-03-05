import { MONEY_INPUT } from '../constants/constants';
import { winningNumber } from '../model/winningNumber';

export const isInvalidMoneyInput = (money) => {
  return (
    money % MONEY_INPUT.MIN_PRICE !== 0 ||
    money < MONEY_INPUT.MIN_PRICE ||
    money > MONEY_INPUT.MAX_PRICE
  );
};

const isDuplicateWinningNumber = (winningNumber) => new Set(winningNumber).size !== 7;
const isOverRangeWinningNumber = (winningNumber) => {
  return winningNumber.some((number) => number < 1 || number > 45);
};

export const isInvalidWinningNumberInput = (winningNumber) => {
  return isDuplicateWinningNumber(winningNumber) || isOverRangeWinningNumber(winningNumber);
};
