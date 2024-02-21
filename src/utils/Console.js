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

  static async errorHandler(getFunc, context) {
    while (true) {
      try {
        const result = await getFunc.call(context);
        return result;
      } catch (err) {
        console.log(err.message);
      }
    }
  }
}

export default Console;
