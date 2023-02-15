import * as readlinePromises from 'node:readline/promises';

const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Console = {
  close() {
    rl.close();
  },

  readLine(query) {
    return rl.question(query);
  },

  print(message) {
    console.log(message);
  },
};

export default Console;
// module.exports = Console;
