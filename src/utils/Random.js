import { LOTTO } from '../constants/values';

function randomGenerator(count) {
  const numbers = [];

  while (numbers.length !== count) {
    const randomNumber = Math.floor(
      LOTTO.LOTTO_MIN_NUMBER + Math.random() * (LOTTO.LOTTO_MAX_NUMBER + 1 - LOTTO.LOTTO_MIN_NUMBER)
    );

    !numbers.includes(randomNumber) && numbers.push(randomNumber);
  }

  return numbers;
}

export default randomGenerator;
