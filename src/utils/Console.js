import readline from 'readline';

const Console = {
  readLineAsync(query) {
    const readLine = readline.createInterface({ input: process.stdin, output: process.stdout });

    return new Promise((resolve) => {
      readLine.question(query, (input) => {
        readLine.close();
        resolve(input);
      });
    });
  },
};

export default Console;
