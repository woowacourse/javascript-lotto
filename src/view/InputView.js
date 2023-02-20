import IO from '../utils/IO';
import { MESSAGE } from '../data/Constants';

const inputPurchaseAmount = () => {
  return IO.input(MESSAGE.INPUT_PURCHASE_AMOUNT);
};

const inputWinningNumber = () => {
  return IO.input(MESSAGE.INPUT_WINNING_NUMBER);
};

const inputBonusNumber = () => {
  return IO.input(MESSAGE.INPUT_BONUS_NUMBER);
};

const inputWhetherToRestart = () => {
  return IO.input(MESSAGE.INPUT_WHETHER_TO_RESTART);
};

export {
  inputPurchaseAmount,
  inputWinningNumber,
  inputBonusNumber,
  inputWhetherToRestart,
};
