import { LOTTO_RULES } from "./constants.js";

export const generateRandomNumbers = () => {
  const randomSet = new Set();
  while (randomSet.size < LOTTO_RULES.NUMBER_COUNT) {
    randomSet.add(
      Math.floor(Math.random() * LOTTO_RULES.MAX_NUMBER) +
        LOTTO_RULES.MIN_NUMBER,
    );
  }
  return Array.from(randomSet);
};
