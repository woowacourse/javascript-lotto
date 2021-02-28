import { STANDARD_NUMBER } from "../Util/constants.js";

class TicketBundle {
  constructor() {
    this.ticketBundle = [];
  }

  makeTicketBundle(ticketLength) {
    this.ticketBundle = Array.from({ length: ticketLength }, () =>
      this.generateRandomNumbers()
    );

    return this.ticketBundle;
  }

  generateRandomNumbers() {
    const numbers = Array.from(
      { length: STANDARD_NUMBER.LOTTO_MAX_NUMBER },
      (_, i) => i + 1
    );

    numbers.sort(() => Math.random() - Math.random());

    return numbers
      .slice(0, STANDARD_NUMBER.TICKET_NUMBER_LENGTH)
      .sort((a, b) => a - b);
  }
}

export default new TicketBundle();
