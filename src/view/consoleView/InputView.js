import readLine from '../../utils/readLine.js';
import { MESSAGE } from '../../utils/constants.js';

const InputView = {
  readPurchaseMoney() {
    return new Promise((resolve) => {
      readLine.question(MESSAGE.REQUEST_PURCHASE_MONEY, (userInput) => resolve(userInput));
    });
  },

  readWinningLottoNumbers() {
    return new Promise((resolve) => {
      readLine.question(MESSAGE.REQUEST_LOTTO_NUMBERS, (userInput) => resolve(userInput));
    });
  },

  readBonusLottoNumber() {
    return new Promise((resolve) => {
      readLine.question(MESSAGE.REQUEST_BONUSE_NUMBER, (userInput) => resolve(userInput));
    });
  },

  readRetryCommand() {
    return new Promise((resolve) => {
      readLine.question(MESSAGE.REQUEST_RETRY_COMMAND, (userInput) => resolve(userInput));
    });
  },
};

export default InputView;
