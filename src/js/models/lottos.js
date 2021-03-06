import TicketModel from "./ticket.js"

class LottosModel {
  #lottos
  #issuableCount
  constructor() {
    this.#lottos = []
    this.#issuableCount = 0
  }

  #addTicket(ticket) {
    this.#lottos.push(ticket)
  }

  generateRandomTicket() {
    const ticket = new TicketModel()
    ticket.generateRandomNumbers()
    this.#addTicket(ticket)
  }

  generateManualTicket(numbers) {
    const ticket = new TicketModel()
    ticket.generateManualNumbers(numbers)
    this.#addTicket(ticket)
  }

  decreaseIssuableCount() {
    this.#issuableCount -= 1
  }

  get lottos() {
    return this.#lottos
  }

  get count() {
    return this.#lottos.length
  }

  get issuableCount() {
    return this.#issuableCount
  }

  set issuableCount(newIssuableCount) {
    this.#issuableCount = newIssuableCount
  }
}

export default LottosModel
