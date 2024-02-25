import readline from "readline";

function readLineAsync(query) {
  return new Promise((resolve) => {
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

function print(message) {
  console.log(message);
}

export { readLineAsync, print };
