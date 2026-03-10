import readline from "readline";

/**
 *
 * 두 수를 포함하는 두 수 사이의 정수 난수 배열 반환.
 * @param {Number} min
 * @param {Number} max
 * @param {Number} range
 * @returns {number[]}
 */
export function pickNumberInRange(min, max, range) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);

  const numbers = new Set();
  while (numbers.size < range) {
    const randomNumber = Math.floor(
      Math.random() * (maxFloored - minCeiled + 1) + minCeiled,
    );
    numbers.add(randomNumber);
  }

  return [...numbers];
}

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
