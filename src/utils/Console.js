import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const Console = {
  readline(query) {
    return rl.question(query);
  },

  close() {
    rl.close();
  },

  print(message) {
    console.log(message);
  },
};

export default Console;
