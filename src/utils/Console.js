import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';

const rl = readline.createInterface({
  input,
  output,
});

const Console = {
  readLine(query) {
    return rl.question(`> ${query}`);
  },

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
