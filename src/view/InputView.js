/* eslint-disable no-await-in-loop */
import readline from 'readline';
import MESSAGE from '../constant/Message';
import IsRetry from '../domain/entity/IsRetry';
import WinningLotto from '../domain/entity/WinningLotto';
import PurchaseLottoService from '../domain/service/PurchaseLottoService';
import OutputView from './OutputView';

const Private = {
  async robustInput(readlineAsync, factory) {
    while (true) {
      try {
        const inputString = await readlineAsync();
        return factory(inputString);
      } catch (e) {
        OutputView.print(e.message);
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
    const readline = () => Private.readLineAsync(MESSAGE.prompt.purchaseMoney);
    const factory = (inputString) => new PurchaseLottoService(inputString);
    return Private.robustInput(readline, factory);
  },

  readWinningNumbers() {
    const readline = () => Private.readLineAsync(MESSAGE.prompt.winningNumber);
    const factory = (inputString) => WinningLotto.fromString(inputString);
    return Private.robustInput(readline, factory);
  },

  readBonusNumber(winningLotto) {
    const readline = () => Private.readLineAsync(MESSAGE.prompt.bonusNumber);
    const factory = (inputString) => winningLotto.setBonusNumberString(inputString);
    return Private.robustInput(readline, factory);
  },

  readIsRetry() {
    const readline = () => Private.readLineAsync(MESSAGE.prompt.retry);
    const factory = (inputString) => new IsRetry(inputString).get();
    return Private.robustInput(readline, factory);
  },
};

export default InputView;
