const lotto = {
  tickets: [],
  issuableTicketAmount: 0,

  setTickets(newTickets) {
    this.tickets = newTickets;
  },

  addTickets(...tickets) {
    this.tickets.push(...tickets);
  },

  setIssuableTicketAmount(amount) {
    this.issuableTicketAmount = amount;
  },

  decreaseIssuableTicketAmount() {
    this.issuableTicketAmount -= 1;
  },
};

export { lotto };
