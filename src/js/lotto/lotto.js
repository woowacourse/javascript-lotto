import { getRandomNumber, sortByNumber } from "../utils/util.js"
import { LOTTO } from "../constants/constant.js"

class Lotto {
  #numbers

  constructor() {
    this.#numbers = new Set()
  }

  generateRandomNumbers() {
    while (this.#numbers.size !== LOTTO.SIZE) {
      this.#numbers.add(getRandomNumber(LOTTO.MIN_NUM, LOTTO.MAX_NUM))
    }
    this.#sortByNumber()
  }

  #sortByNumber() {
    this.#numbers = new Set(sortByNumber([...this.#numbers]))
  }

  get numbers() {
    return [...this.#numbers]
  }
}

export default Lotto
