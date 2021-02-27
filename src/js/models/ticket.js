import { TICKET } from "../constants/constant.js"
import { generateRandomNumber, sortByNumber } from "../util.js"

class Ticket {
  #numbers
  constructor() {
    this.#numbers = new Set()
  }

  #sortByNumber() {
    this.#numbers = new Set(sortByNumber([...this.#numbers]))
  }

  get numbers() {
    return [...this.#numbers]
  }

  generateRandomNumbers() {
    while (this.#numbers.size !== TICKET.SIZE) {
      this.#numbers.add(generateRandomNumber(TICKET.MIN_NUM, TICKET.MAX_NUM))
    }

    this.#sortByNumber()
  }
}

export default Ticket
