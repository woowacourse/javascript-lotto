import readline from 'readline';

class Console {
  /**
   * @param {string} query
   */
  static async readLineAsync(query) {
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

  /**
   * @param {string} query
   */
  static print(message) {
    // eslint-disable-next-line
    console.log(message);
  }
}

export default Console;
