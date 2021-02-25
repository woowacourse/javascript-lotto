import { TICKET } from "../constants/constant.js"
import { generateRandomNumber, sortByNumber } from "../util.js"

class Ticket {
  constructor() {
    this._numbers = new Set()
  }

  generateRandomNumbers() {
    while (this._numbers.size !== TICKET.SIZE) {
      this._numbers.add(generateRandomNumber(TICKET.MIN_NUM, TICKET.MAX_NUM))
    }

    this.sortByNumber()
  }

  sortByNumber() {
    this._numbers = new Set(sortByNumber([...this._numbers]))
  }

  get numbers() {
    return [...this._numbers]
  }
}

export default Ticket

// const ticket = new Ticket()
// this.model.addTicket(ticket)
