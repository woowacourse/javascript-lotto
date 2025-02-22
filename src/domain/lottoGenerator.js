import { LOTTO, PURCHASE } from "../config/const.js";

class LottoGenerator {
  static getGenerateLottos(price) {
    let generatedLottos = [];
    for (let i = 0; i < price / PURCHASE.UNIT; i++) {
      const randomNumbers = this.#getRandomNumbers();
      const sortedRandomNumbers = this.#sortNumbers(randomNumbers);
      generatedLottos.push(sortedRandomNumbers);
    }
    return generatedLottos;
  }

  static #sortNumbers(numbers) {
    return numbers.sort((a, b) => a - b);
  }

  static #getRandomNumbers() {
    const randomNumbers = new Set();
    while (randomNumbers.size < LOTTO.MAX_LENGTH) {
      randomNumbers.add(
        Math.floor(Math.random() * LOTTO.MAX_NUMBER) + LOTTO.MIN_NUMBER
      );
    }
    return [...randomNumbers];
  }
}

export default LottoGenerator;
