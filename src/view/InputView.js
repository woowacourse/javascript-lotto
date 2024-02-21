import WinningLotto from '../domain/entity/WinningLotto.js';
import OutputView from './OutputView.js';
import readline from 'readline';

const Private = {
  async robustInput(config) {
    while (true) {
      try {
        const inputString = await config.readline();
        return config.factory(inputString);
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

      rl.question(query, input => {
        rl.close();
        resolve(input);
      });
    });
  },
};

const InputView = {
  async readWinningNumbers() {
    const winningNumberConfig = {
      readline: async () => await Private.readLineAsync('message'),
      factory: input => new WinningLotto(input),
      errorHandler: e => OutputView.print(e.message),
    };
    return await Private.robustInput(winningNumberConfig);
  },

  readBonusNumber(winningLotto) {
    const bonusNumberConfig = {
      readline: async () => await Private.readLineAsync(message),
      factory: input => winningLotto.setBonusNumber(input),
      errorHandler: e => OutputView.print(e.message),
    };
    return Private.robustInput(bonusNumberConfig);
  },
};

export default InputView;
