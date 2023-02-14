import IO from '../utils/IO';
import { MESSAGE } from '../data/Constants';

const inputPurchaseAmount = () => {
  return IO.input(MESSAGE.INPUT_PURCHASE_AMOUNT);
};

const inputWinningNumber = () => {
  return IO.input(MESSAGE.INPUT_WINNING_NUMBER);
};

export { inputPurchaseAmount, inputWinningNumber };
