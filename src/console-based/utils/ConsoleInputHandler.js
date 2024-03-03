import readline from 'readline';
import { GAME_SYMBOL } from '../../constant/symbols';

class ConsoleInputHandler {
  static makeReadLineQuestion(query, rl) {
    return new Promise((resolve, reject) => {
      rl.question(query, (input) => {
        if (input === '') reject(new Error(GAME_SYMBOL.ERROR));
        rl.close();
        resolve(input);
      });
    });
  }

  static async readLineAsync(query) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return await this.makeReadLineQuestion(query, rl);
  }
}

export default ConsoleInputHandler;
