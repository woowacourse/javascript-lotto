import readline from "readline";

class Input {
  async readLineAsync(message) {
    return new Promise((resolve, reject) => {
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

export default Input;
