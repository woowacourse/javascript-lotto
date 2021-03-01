import TicketModel from "./ticket.js"

class LottosModel {
  #lottos
  #amount
  constructor() {
    this.#lottos = []
    this.#amount = 0
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

  decreaseAmount() {
    this.#amount -= 1
  }

  get lottos() {
    return this.#lottos
  }

  get amount() {
    return this.#amount
  }

  set amount(newAmount) {
    this.#amount = newAmount
  }
}

export default LottosModel
