import IO from '../utils/IO';
import { MESSAGE } from '../data/Constants';

export const inputPurchaseAmount = () => {
  return IO.input(MESSAGE.INPUT_PURCHASE_AMOUNT);
};

export const inputWinningNumber = () => {
  return IO.input(MESSAGE.INPUT_WINNING_NUMBER);
};

export const inputBonusNumber = () => {
  return IO.input(MESSAGE.INPUT_BONUS_NUMBER);
};

export const inputWhetherToRestart = () => {
  return IO.input(MESSAGE.INPUT_WHETHER_TO_RESTART);
};
