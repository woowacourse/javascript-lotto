import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const rlConsole = {
  readLine(inputMessage) {
    return new Promise(resolve => {
      rl.question(inputMessage, resolve);
    });
  },

  print(message) {
    console.log(message);
  },

  close() {
    rl.close();
  },
};

export default rlConsole;
