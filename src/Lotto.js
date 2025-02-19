import LOTTO from "./constant/lotto.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validateNumbers(numbers);
    this.#numbers = numbers;
  }

  //validate
  #validateNumbers(numbers) {
    const numbersArray = numbers.split(',').map(Number);
    if (numbersArray.length < LOTTO.LENGTH) throw new Error();
    if (numbersArray.some((num) => isNaN(num))) throw new Error();
    if (numbersArray.length !== new Set(numbersArray).size) throw new Error();
    if (numbersArray.some((num) => num < 1 || num > 45)) throw new Error();
  }
}

export default Lotto;