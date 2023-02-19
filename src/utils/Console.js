import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
import Messages from '../constant/Messages';

const rl = readline.createInterface({
  input,
  output,
});

const Console = {
  /**
   * @param {string} query
   * @param {...any} args
   * @returns {Promise<string>}
   */
  readLine(query, ...args) {
    return rl.question(`> ${Messages.format(query, ...args)}`);
  },

  /**
   *
   * @param {string} message
   * @param {...any} args
   */
  printf(message, ...args) {
    Console.print(Messages.format(message, ...args));
  },

  /**
   * @param {string} message
   */
  print(message) {
    console.log(message);
  },

  close() {
    rl.close();
  },

  async repeatWhile(readFn) {
    try {
      return await readFn();
    } catch (error) {
      Console.print(`[ERROR] ${error.message}`);
      return this.repeatWhile(readFn);
    }
  },
};

export default Console;
