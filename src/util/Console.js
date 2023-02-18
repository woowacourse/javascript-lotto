const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

const Console = {
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

module.exports = Console;
