const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

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

module.exports = Console;
