import readline from 'readline';

class Console {
  static makeReadLineQuestion(query, rl) {
    return new Promise((resolve, reject) => {
      rl.question(query, (input) => {
        if (input === '') reject(new Error('[ERROR]'));
        rl.close();
        resolve(input);
      });
    });
  }

  static async readLineAsync(query) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return await this.makeReadLineQuestion(query, rl);
  }
}

export default Console;
