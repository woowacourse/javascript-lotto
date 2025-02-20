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

export function generateUniqueNumberArray(start, end, length) {
  return new Array(length).fill(null).reduce((prev, cur) => {
    while (true) {
      const randomNumber = generateRandomNumber(start, end);
      if (prev.includes(randomNumber)) continue;

      return [...cur, randomNumber];
    }
  }, []);
}

export function calculateProfitRate(profit, price) {
  return Number(((profit / price) * 100).toFixed(1));
}

export function checkUniqueArray(array) {
  return array.length === new Set(array).size;
}

export function generateRandomNumber(start, end) {
  return Math.floor(Math.random() * (end + 1 - start)) + start;
}

export function getIntersectCount(array1, array2) {
  return array1.filter((value) => array2.includes(value)).length;
}

export async function retryUntilSuccess(callbackFunction) {
  try {
    return await callbackFunction();
  } catch (error) {
    console.log(error.message);
    return retryUntilSuccess(callbackFunction);
  }
}

export function calculateMatchCount(array, number) {
  return array.filter((item) => item === number).length;
}
