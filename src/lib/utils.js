import readline from 'readline';

export function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    if (arguments.length !== 1) {
      reject(new Error('arguments must be 1'));
    }

    if (typeof query !== 'string') {
      reject(new Error('query must be string'));
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

export function generateUniqueRandomValue(array, { start, end }) {
  const randomNumber = generateRandomNumber(start, end);
  if (array.includes(randomNumber)) return generateUniqueRandomValue(array, { start, end });

  return randomNumber;
}

export function generateUniqueNumbers({ start, end }, length) {
  return new Array(length).fill(null).reduce((prev) => {
    const uniqueRandomValue = generateUniqueRandomValue(prev, { start, end });

    return [...prev, uniqueRandomValue];
  }, []);
}

export function calculateProfitRate(profit, price) {
  return Number(((profit / price) * 100).toFixed(1));
}

export function checkUniqueArray(array) {
  return array.length === new Set(array).size;
}

export function getIntersectCount(array1, array2) {
  return array1.filter((value) => array2.includes(value)).length;
}

export async function retryUntilSuccess(callbackFunction, onError) {
  try {
    return await callbackFunction();
  } catch (error) {
    onError?.(error);
    return retryUntilSuccess(callbackFunction, onError);
  }
}

export function calculateMatchCount(array, number) {
  return array.filter((item) => item === number).length;
}
