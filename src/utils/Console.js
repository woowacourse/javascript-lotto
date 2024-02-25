import readline from 'readline';

class Console {
  // eslint-disable-next-line
  static async readLineAsync(query) {
    // eslint-disable-next-line
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(query, (input) => {
        rl.close();
        resolve(input);
      });
    });
  }

  static print(message) {
    // eslint-disable-next-line
    console.log(message);
  }
}

export default Console;
