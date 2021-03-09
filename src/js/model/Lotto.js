export default class Lotto {
  constructor() {
    this.amount = 0;
    this.tickets = [];
    this.inputtedSelfNumbers = [];
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

  addInputtedSelfNumbers(numbers) {
    this.inputtedSelfNumbers.push(numbers);
  }

  getInputtedSelfNumbers() {
    return this.inputtedSelfNumbers;
  }

  initialize() {
    this.amount = 0;
    this.tickets = [];
    this.inputtedSelfNumbers = [];
  }
}
