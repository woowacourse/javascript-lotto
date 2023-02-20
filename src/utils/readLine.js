import { createInterface } from 'readline';

const readLine = createInterface({
  input: process.stdin,
  output: process.stdout,
});

export default readLine;
