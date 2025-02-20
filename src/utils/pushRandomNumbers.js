import { LOTTO_NUMBER_END, LOTTO_NUMBER_MAX_LENGTH, LOTTO_NUMBER_START } from "../constants/constant.js";
import generateRandomNumber from "./generateRandomNumber.js";

const pushRandomNumbers = (randomNumbers) => {
  while (randomNumbers.length < LOTTO_NUMBER_MAX_LENGTH) {
    const randomNumber = generateRandomNumber(LOTTO_NUMBER_START, LOTTO_NUMBER_END);
    randomNumbers.push(randomNumber);
  }
  return randomNumbers;
};
export default pushRandomNumbers;
