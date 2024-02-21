import { MESSAGE } from '../constants/message';
import readLineAsync from '../utils/readLineAsync';
import OutputView from './OutputView';

const InputView = {
  async readPurchaseAmount() {
    return this.inputLoop(await readLineAsync(MESSAGE.PURCHASE_AMOUNT_INPUT));
  },

  inputLoop(func) {
    while (true) {
      try {
        return func();
      } catch (error) {
        OutputView.print(error.message);
      }
    }
  },
};

export default InputView;
