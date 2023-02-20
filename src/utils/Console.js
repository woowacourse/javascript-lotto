const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Console = {
  readLine: (message) =>
    new Promise((resolve) => rl.question(message, (input) => resolve(input))),
  print: (data) => console.log(data),
  quit: () => rl.close(),
};

module.exports = Console;
