import { createInterface } from 'readline';
import { stdin as input, stdout as output } from 'process';

const rl = createInterface({ input, output });

const Console = {
  readLine(string) {
    return new Promise((resolve) => rl.question(string, (input) => resolve(input)));
  },

  print(string) {
    console.log(string);
  },

  close() {
    rl.close();
  },
};

export default Console;
