import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const IO = {
  input(question) {
    return rl.question(question);
  },
  output(message) {
    console.log(message);
  },
  close() {
    rl.close();
  },
};

export default IO;
