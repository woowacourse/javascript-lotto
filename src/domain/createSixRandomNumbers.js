import { LOTTO_NUMBER_MAX_LENGTH } from "../constants/constant.js";

const createSixRandomNumbers = () => {
  const randomNumbers = pushRandomNumbers([]);
  if (new Set(randomNumbers).size !== randomNumbers.length) createSixRandomNumbers();

  return randomNumbers;
};

const pushRandomNumbers = (randomNumbers) => {
  while (randomNumbers.length < LOTTO_NUMBER_MAX_LENGTH) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    randomNumbers.push(randomNumber);
  }
  return randomNumbers;
};

export default createSixRandomNumbers;
