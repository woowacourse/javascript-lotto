import TicketModel from "./ticket.js"

class LottosModel {
  #lottos

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

  decreaseAmount(number) {
    this.#amount -= number
  }

  get lottos() {
    return this.#lottos
  }

  set amount(newAmount) {
    this.#amount = newAmount
  }
}

export default LottosModel
