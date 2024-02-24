import CustomError from "../error/CustomError.js";
import { ERROR_MESSAGE } from "../error/ErrorMessage.js";

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomNumbers(min, max, count) {
  if (max - min < count)
    throw new CustomError(ERROR_MESSAGE.generateRandomNumberInvalidRange);

  const uniqueNumbers = new Set();

  while (uniqueNumbers.size < count) {
    uniqueNumbers.add(generateRandomNumber(min, max));
  }

  return [...uniqueNumbers];
}

export { generateRandomNumbers };

