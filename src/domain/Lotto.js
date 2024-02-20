import { generateRandomNumbers } from "../utils/generateRandomNumbers.js";

const MIN_LOTTO_NUMBER = 1;
const MAX_LOTTO_NUMBER = 45;
const LOTTO_NUMBER_COUNT = 6;

class Lotto {
  #numbers;

  constructor() {
    // NOTE: 생성자의 타입이 다양할 때 이렇게 조건문을 걸어서 판별하는게 옳을까요?
    // if(typeof numbers === 'string') numbers.split()
    this.#numbers = generateRandomNumbers(
      MIN_LOTTO_NUMBER,
      MAX_LOTTO_NUMBER,
      LOTTO_NUMBER_COUNT
    );
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
