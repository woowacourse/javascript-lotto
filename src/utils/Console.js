const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Console = {
  readLine(query, callback) {
    rl.question(query, callback);
  },
  print(message) {
    console.log(message);
  },
  close() {
    rl.close();
  },
};

module.exports = Console;
