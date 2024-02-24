import OutputView from './OutputView';
import readline from 'readline';

const readLine = {
  async(query) {
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
  async readExactValue(config) {
    while (true) {
      const inputString = await readLine.async(config.message);
      try {
        return await config.factory(inputString);
      } catch (e) {
        OutputView.print(e.message);
      }
    }
  },
};

export default InputView;
