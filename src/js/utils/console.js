import * as readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Console = {
  readLine(inputMessage) {
    return new Promise(resolve => {
      rl.question(inputMessage, input => resolve(input));
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
