import * as readline from 'node:readline/promises';

const Console = (function () {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return {
    print: message => console.log(message),
    readline: query => rl.question(query),
    close: () => rl.close(),
  };
})();

export default Console;
