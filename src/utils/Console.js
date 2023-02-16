const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Console = {
  readLine(query) {
    return new Promise((resolve) => {
      rl.question(query, (input) => resolve(input));
    });
  },
  print(message) {
    console.log(message);
  },
  close() {
    rl.close();
  },
};

module.exports = Console;
