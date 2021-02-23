export default class Lotto {
  constructor() {
    this.clear();
  }

  getTickets() {
    return this.tickets;
  }

  setPurchasePrice(purchasePrice) {
    this.purchasePrice = purchasePrice;
  }

  addTicket(ticket) {
    this.tickets.push(ticket);
  }

  clear() {
    this.tickets = [];
    this.purchasePrice = 0;
  }
}
