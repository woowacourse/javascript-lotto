import readline from "readline";
import Input from "./Input.js";

class ConsoleInput extends Input {
  constructor() {
    super();
  }
  
  async readLineAsync(message) {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(message ?? "", (line) => {
        rl.close();
        resolve(line);
      });
    });
  }
}

export default ConsoleInput;
