import * as readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Console {
  static readLine(query) {
    return new Promise(resolve => {
      rl.question(query, answer => resolve(answer));
    });
  }

  static print(input) {
    console.log(input);
  }

  static close() {
    rl.close();
  }
}

export default Console;
