import { LOTTO } from "./constant/index.js";

export const pickLottoNumbers = () => {
  const lottoNumbers = new Set();

  do {
    const randomNumber =
      Math.random() * (LOTTO.MAX_NUMBER - LOTTO.MIN_NUMBER) + LOTTO.MIN_NUMBER;
    lottoNumbers.add(Math.floor(randomNumber));
  } while (lottoNumbers.size < LOTTO.COUNT);

  return [...lottoNumbers.keys()];
};

export const MockPickLottoNumbers = (returnValues) => {
  return returnValues.shift();
};

export const parseNumbers = (raw) => {
  const numbers = raw.split(",").map(Number);
  return numbers;
};

