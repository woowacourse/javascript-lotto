import * as readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Console = {
  read(message, callback) {
    rl.question(message, callback);
  },

  print(message) {
    console.log(message);
  },

  close() {
    rl.close();
  },
};

export default Console;
