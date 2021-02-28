export default class Lotto {
  constructor() {
    this.amount = 0;
    this.tickets = [];
    this.selves = []
  }
  setAmount(amount) {
    this.amount = amount;
  }

  getAmount() {
    return this.amount;
  }

  addTicket(ticket) {
    this.tickets.push(ticket);
  }

  getTickets() {
    return this.tickets;
  }

  addSelfNumbers(selfNumbers) {
    this.selves.push(selfNumbers);
  }

  getSelves() {
    return this.selves
  }

  initialize() {
    this.amount = 0;
    this.tickets = [];
    this.selves = []
  }
}
