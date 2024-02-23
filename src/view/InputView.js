import readline from 'readline';
import MESSAGE from '../constant/Message';
import IsRetry from '../domain/entity/IsRetry';
import WinningLotto from '../domain/entity/WinningLotto';
import PurchaseLottoService from '../domain/service/PurchaseLottoService';
import OutputView from './OutputView';

const Private = {
  async robustInput(config) {
    while (true) {
      try {
        const inputString = await config.readline();
        return await config.factory(inputString);
      } catch (e) {
        config.errorHandler(e);
      }
    }
  },

  readLineAsync(query) {
    return new Promise((resolve, reject) => {
      if (arguments.length !== 1) {
        reject(new Error('arguments must be 1'));
      }

      if (typeof query !== 'string') {
        reject(new Error('query must be string'));
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(query, (input) => {
        rl.close();
        resolve(input);
      });
    });
  },
};

const InputView = {
  async readPurchaseMoney() {
    const purchaseMoneyConfig = {
      readline: async () => await Private.readLineAsync(MESSAGE.prompt.purchaseMoney),
      factory: (inputString) => new PurchaseLottoService(inputString),
      errorHandler: (e) => OutputView.print(e.message),
    };
    return await Private.robustInput(purchaseMoneyConfig);
  },

  async readWinningNumbers() {
    const winningNumberConfig = {
      readline: async () => await Private.readLineAsync(MESSAGE.prompt.winningNumber),
      factory: (inputString) => WinningLotto.fromString(inputString),
      errorHandler: (e) => OutputView.print(e.message),
    };
    return await Private.robustInput(winningNumberConfig);
  },

  async readBonusNumber(winningLotto) {
    const bonusNumberConfig = {
      readline: async () => await Private.readLineAsync(MESSAGE.prompt.bonusNumber),
      factory: (inputString) => winningLotto.setBonusNumberString(inputString),
      errorHandler: (e) => OutputView.print(e.message),
    };
    return await Private.robustInput(bonusNumberConfig);
  },

  async readIsRetry() {
    const bonusNumberConfig = {
      readline: async () => await Private.readLineAsync(MESSAGE.prompt.retry),
      factory: (inputString) => new IsRetry(inputString).get(),
      errorHandler: (e) => OutputView.print(e.message),
    };
    return await Private.robustInput(bonusNumberConfig);
  },
};

export default InputView;
