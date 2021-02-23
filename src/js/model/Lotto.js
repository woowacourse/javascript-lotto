export default class Lotto {
  constructor() {
    this.clear();
  }

  setTickets(ticket) {
    this.tickets.push(ticket);
  }

  getTickets() {
    return this.tickets;
  }

  setPurchasePrice(purchasePrice) {
    this.purchasePrice = purchasePrice;
  }

  clear() {
    this.tickets = [];
    this.purchasePrice = 0;
  }
}
