import { TICKET } from "../constants/constant.js"
import { generateRandomNumber, sortByNumber } from "../util.js"

class TicketModel {
  #numbers

  constructor() {
    this.#numbers = new Set()
  }

  #sortByNumber() {
    this.#numbers = new Set(sortByNumber([...this.#numbers]))
  }

  generateRandomNumbers() {
    while (this.#numbers.size !== TICKET.SIZE) {
      this.#numbers.add(generateRandomNumber(TICKET.MIN_NUM, TICKET.MAX_NUM))
    }

    this.#sortByNumber()
  }

  generateManualNumbers(numbers) {
    this.#numbers = new Set(numbers)
    this.#sortByNumber()
  }

  get numbers() {
    return [...this.#numbers]
  }
}

export default TicketModel
