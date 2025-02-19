import LOTTO from "./constant/lotto.js";
import ERROR_MESSAGE from "./constant/error.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validateNumbers(numbers);
    this.#numbers = numbers;
  }

  //validate
  #validateNumbers(numbers) {
    const numbersArray = numbers.split(',').map(Number);
    if (numbersArray.length < LOTTO.LENGTH) throw new Error(ERROR_MESSAGE.LOTTO_LENGTH);
    if (numbersArray.some((num) => isNaN(num))) throw new Error(ERROR_MESSAGE.NOT_A_NUMBER);
    if (numbersArray.length !== new Set(numbersArray).size) throw new Error(ERROR_MESSAGE.DUPLICATE_NUMBER);
    if (numbersArray.some((num) => num < 1 || num > 45)) throw new Error(ERROR_MESSAGE.NUMBER_OUT_OF_RANGE);
  }
}

export default Lotto;