import * as readline from 'node:readline/promises';

const Console = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export default Console;
