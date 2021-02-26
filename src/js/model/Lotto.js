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

  setPurchaseBudget(purchaseBudget) {
    this.purchaseBudget = purchaseBudget;
  }

  addTicket(ticket) {
    this.tickets.push(ticket);
  }

  clear() {
    this.tickets = [];
    this.purchasePrice = 0;
    this.purchaseBudget = 0;
  }
}
