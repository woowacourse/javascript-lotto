import { LOTTO_INTO } from "./constants";

export const generateRandomNumbers = () => {
  const randomSet = new Set();
  while (randomSet.size < LOTTO_INTO.LOTTO_NUMBER_COUNT) {
    randomSet.add(
      Math.floor(Math.random() * LOTTO_INTO.LOTTO_MAX_NUMBER) +
        LOTTO_INTO.LOTTO_MIN_NUMBER,
    );
  }
  return Array.from(randomSet);
};
