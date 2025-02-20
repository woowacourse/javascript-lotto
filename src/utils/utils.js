import readline from "readline";

export async function readLineAsync(query) {
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

export async function retryUntilSuccess(callbackFn) {
  try {
    return await callbackFn();
  } catch (err) {
    console.log(err.message);

    return await retryUntilSuccess(callbackFn);
  }
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function makeOneLottoArray() {
  const lotto = [];
  while (lotto.length < 6) {
    const curNumber = getRandomInt(44) + 1;
    if (lotto.includes(curNumber)) continue;
    lotto.push(curNumber);
  }

  return lotto.sort((a, b) => a - b);
}
