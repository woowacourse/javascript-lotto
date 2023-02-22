import { LOTTO } from '../constant/constants.js';

function randomGenerator(count) {
  const numbers = [];

  while (numbers.length !== count) {
    const randomNumber = Math.floor(
      LOTTO.MIN_NUMBER + Math.random() * (LOTTO.MAX_NUMBER + 1 - LOTTO.MIN_NUMBER)
    );

    !numbers.includes(randomNumber) && numbers.push(randomNumber);
  }

  return numbers;
}

export default randomGenerator;
