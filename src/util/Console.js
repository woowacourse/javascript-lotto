import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Console = {
  question(message) {
    return new Promise((resolve) => {
      rl.question(message, (input) => resolve(input));
    });
  },

  print(message) {
    console.log(message ?? '');
  },

  close() {
    rl.close();
  },
};

export default Console;
