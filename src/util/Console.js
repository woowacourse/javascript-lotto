const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Console = {
  readline(inputMessage) {
    return new Promise((resolve) => {
      rl.question(inputMessage, (answer) => resolve(answer));
    });
  },
};

module.exports = Console;
