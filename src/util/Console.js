import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const readLine = readline.createInterface({ input, output });

const Console = {
  read(query) {
    return readLine.question(query);
  },

  print(message) {
    console.log(message);
  },

  close() {
    readLine.close();
  },
};

export default Console;
