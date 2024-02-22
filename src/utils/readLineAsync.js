import readline from "readline";
import { ERROR_MESSAGE } from "../constants/message";

function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    if (arguments.length !== 1) {
      reject(new Error(ERROR_MESSAGE.invalidInput));
    }

    if (typeof query !== "string") {
      reject(new Error(ERROR_MESSAGE.invalidInput));
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

export default readLineAsync;
