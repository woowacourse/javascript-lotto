import { LOTTO_NUMBER_MAX_LENGTH } from "../constants/constant.js";

const createSixRandomNumber = () => {
  const randomNumbers = [];
  while (randomNumbers.length < LOTTO_NUMBER_MAX_LENGTH) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    if (randomNumbers.includes(randomNumber)) {
      continue;
    }
    randomNumbers.push(randomNumber);
  }
  return randomNumbers;
};

export default createSixRandomNumber;
