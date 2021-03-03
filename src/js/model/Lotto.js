export default class Lotto {
  constructor() {
    this.amount = 0;
    this.tickets = [];
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

  initialize() {
    this.amount = 0;
    this.tickets = [];
  }
}
