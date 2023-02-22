import { LOTTO_MAX_NUMBER, LOTTO_MIN_NUMBER } from '../constants/values';

function randomGenerator(count) {
  const numbers = [];

  while (numbers.length !== count) {
    const randomNumber = Math.floor(
      LOTTO_MIN_NUMBER + Math.random() * (LOTTO_MAX_NUMBER + 1 - LOTTO_MIN_NUMBER)
    );

    !numbers.includes(randomNumber) && numbers.push(randomNumber);
  }

  return numbers;
}

export default randomGenerator;
