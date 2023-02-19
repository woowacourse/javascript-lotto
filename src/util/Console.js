import * as readline from 'node:readline/promises';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Console = (function () {
  return {
    print: message => console.log(message),
    readline: query => rl.question(query),
    close: () => rl.close(),
  };
})();

export default Console;
