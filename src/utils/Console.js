import * as readline from 'node:readline/promises';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Console = {
  print(message) {
    console.log(message);
  },

  async readline(query) {
    return await rl.question(query);
  },

  close() {
    rl.close();
  },
};

export default Console;
