import TicketModel from "./ticket.js"

class LottosModel {
  #lottos

  constructor() {
    this.#lottos = []
  }

  #addTicket(ticket) {
    this.#lottos.push(ticket)
  }

  generateRandomTicket() {
    const ticket = new TicketModel()
    ticket.generateRandomNumbers()
    this.#addTicket(ticket)
  }

  get lottos() {
    return this.#lottos
  }
}

export default LottosModel
