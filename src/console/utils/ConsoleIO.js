import { createInterface } from 'readline';
import { stdin as input, stdout as output } from 'process';

const rl = createInterface({ input, output });

const ConsoleIO = {
  readLine(query) {
    return new Promise((resolve) => rl.question(query, resolve));
  },

  print(message) {
    console.log(message);
  },

  close() {
    rl.close();
  },
};

export default ConsoleIO;
