import { Lotto } from "../models/index.js";
import { toNumber } from "./number.js";
import { validateLottoNumber } from "./validate.js";

const getRandomNumber = () =>
  Math.floor(
    Math.random() * (Lotto.MAX_NUMBER - Lotto.MIN_NUMBER + 1) + Lotto.MIN_NUMBER
  );

const generateLottoNumbers = () => {
  const randomNumbers = new Set();
  while (randomNumbers.size < Lotto.NUMBERS_LENGTH) {
    randomNumbers.add(getRandomNumber());
  }

  return Array.from(randomNumbers);
};

const readLottoNumber = (text) => {
  const number = toNumber(text);
  validateLottoNumber(number);

  return number;
};

export { generateLottoNumbers, readLottoNumber };
