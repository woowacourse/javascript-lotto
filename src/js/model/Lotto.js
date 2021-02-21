export default class Lotto {
  constructor() {
    this.tickets = [];
  }

  setTicket(ticket) {
    this.tickets.push(ticket);
  }

  getTickets() {
    return this.tickets;
  }
}
