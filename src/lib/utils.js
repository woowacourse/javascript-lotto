import readline from "readline";

export function readLineAsync(query) {
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

export function generateRandomNumber(start, end) {
  return Math.floor(Math.random() * (end + 1 - start)) + start;
}

export function getIntersectCount(array1, array2) {
  return array1.filter((value, index) => value === array2[index]).length;
}
