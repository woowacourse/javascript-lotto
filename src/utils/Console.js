import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const Console = {
  async read(content) {
    return await rl.question(content);
  },
  print(outputLog) {
    console.log(outputLog);
  },
  close() {
    rl.close();
  },
};

export default Console;
