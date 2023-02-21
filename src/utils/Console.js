const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Console = {
  readLine(question, callback) {
    rl.question(question, callback);
  },

  print(data) {
    console.log(data);
  },

  quit() {
    rl.close();
  },
};

module.exports = Console;
