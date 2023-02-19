import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const Console = {
  async read(query) {
    const answer = await rl.question(`> ${query}`);
    return answer;
  },

  print(text) {
    console.log(text);
  },

  printError(message) {
    console.error(message);
  },

  close() {
    rl.close();
  },
};

export default Console;
