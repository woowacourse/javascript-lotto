import * as readlinePromises from 'node:readline/promises';
import { ERROR } from '../constant/constants.js';

const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Console = {
  close() {
    rl.close();
  },

  readLine(query) {
    if (!query) throw new Error(ERROR.NEED_QUERY);
    return rl.question(query);
  },

  print(message) {
    console.log(message);
  },
};

export default Console;
