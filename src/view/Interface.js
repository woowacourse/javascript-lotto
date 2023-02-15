import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

class Interface {
  #rl;

  constructor() {
    this.#rl = readline.createInterface({
      input: stdin,
      output: stdout,
    });
  }

  close() {
    this.#rl.close();
  }

  read(message) {
    return this.#rl.question(message);
  }
}

export default Interface;
