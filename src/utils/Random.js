import { SETTINGS } from "../constants/Config";

const Random = {
  getnerateRandomNumbers() {
    const randomNumbers = [];
    while (randomNumbers.length < SETTINGS.RANDOM_NUMBER_LENGTH) {
      Random.makeRandomNumbers(randomNumbers);
    }
    return randomNumbers;
  },

  makeRandomNumbers(randomNumbers) {
    const number = parseInt(
      Math.random() * SETTINGS.LOTTO_RANDOM_NUMBER_RANGE + 1,
      10
    );
    if (randomNumbers.indexOf(number) < 0) {
      return randomNumbers.push(number);
    }
  },
};
export default Random;
