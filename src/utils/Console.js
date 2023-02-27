const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const Console = {
  readLine(query) {
    return new Promise(resolve => {
      rl.question(query, answer => resolve(answer));
    });
  },

  print(input) {
    console.log(input);
  },

  close() {
    rl.close();
  },
};

module.exports = Console;
