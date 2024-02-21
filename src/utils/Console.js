import readline from 'readline';

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Console = {
  readLineAsync(query) {
    return new Promise((resolve) => {
      readLine.question(query, (input) => {
        readLine.close();
        resolve(input);
      });
    });
  },
};

export default Console;
