import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const Console = {
  read(query) {
    return rl.question(`> ${query} `);
  },

  print(text) {
    console.log(text);
  },

  close() {
    rl.close();
  },
};

export default Console;
