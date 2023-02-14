import IO from '../utils/IO';
import { MESSAGE } from '../data/Constants';

const inputPurchaseAmount = () => {
  return IO.input(MESSAGE.INPUT_PURCHASE_AMOUNT);
};

export { inputPurchaseAmount };
