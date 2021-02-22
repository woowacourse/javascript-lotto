import { Lotto } from "../models/index.js";

const getRandomNumber = () =>
  Math.floor(
    Math.random() * (Lotto.MAX_NUMBER - Lotto.MIN_NUMBER + 1) + Lotto.MIN_NUMBER
  );

export const generateLottoNumbers = () => {
  const randomNumbers = new Set();
  while (randomNumbers.size < Lotto.NUMBERS_LENGTH) {
    randomNumbers.add(getRandomNumber());
  }

  return [...randomNumbers];
};
