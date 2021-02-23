import { StandardNumber } from "../Util/constants.js";

class Ticket {
  constructor() {
    this.ticketBundle = [];
  }

  makeTicketBundle(ticketLength) {
    this.ticketBundle = Array.from({ length: ticketLength }, () =>
      this.generateRandomNumbers()
    );
  }

  generateRandomNumbers() {
    const numbers = Array.from(
      { length: StandardNumber.LOTTO_MAX_NUMBER },
      (_, i) => i + 1
    );

    numbers.sort(() => Math.random() - Math.random());

    return numbers
      .slice(0, StandardNumber.TICKET_NUMBER_LENGTH)
      .sort((a, b) => a - b);
  }
}

export default new Ticket();
