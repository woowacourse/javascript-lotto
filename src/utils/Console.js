import * as readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Console = {
  read(message) {
    return new Promise((resolve) => {
      rl.question(message, (input) => resolve(input));
    });
  },

  print(message) {
    console.log(message);
  },

  close() {
    rl.close();
  },
};

export default Console;
