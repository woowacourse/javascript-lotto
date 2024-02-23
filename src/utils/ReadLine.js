/* eslint-disable max-lines-per-function */
import readline from "readline";
import AppError from "./Error";

export default function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    if (arguments.length !== 1) {
      reject(new AppError("arguments must be 1"));
    }

    if (typeof query !== "string") {
      reject(new AppError("query must be string"));
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
