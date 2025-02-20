import readline from "readline";

class Console {
  static readLineAsync(query) {
    return new Promise((resolve, reject) => {
      if (arguments.length !== 1) {
        reject(new Error("arguments must be 1"));
      }

      if (typeof query !== "string") {
        reject(new Error("query must be string"));
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(query, (input) => {
        rl.close();
        resolve(input);
      });
    });
  }

  static print(input) {
    console.log(input);
  }

  static println() {
    console.log();
  }

  static printError(input) {
    console.log(`[ERROR] ${input}`);
    console.log();
  }
}

export default Console;
