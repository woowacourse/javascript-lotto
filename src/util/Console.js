const Console = {
  readLineAsync(query = '') {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    return new Promise((resolve) => {
      rl.question(query, (input) => {
        rl.close();
        resolve(input);
      });
    });
  },
};
export default Console;
