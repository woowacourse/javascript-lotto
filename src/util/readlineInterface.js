import * as readline from 'readline';

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export default readlineInterface;
