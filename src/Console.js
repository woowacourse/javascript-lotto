import readline from "readline";

export const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function readLine(query) {
  return new Promise((resolve) => {
    read.question(query, (answer) => {
      resolve(answer);
    });
  });
}
