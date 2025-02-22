import { CONSTANT } from "../constant/constant";

export default drawRandomNumbers = (count) => {
  const randomNumbers = new Set();
  while (randomNumbers.size < count) {
    const randomNumber = Math.floor(
      Math.random() * CONSTANT.MAX_LOTTO_VALUE + CONSTANT.MIN_LOTTO_VALUE
    );
    randomNumbers.add(randomNumber);
  }

  return Array.from(randomNumbers).sort((a, b) => a - b);
};
