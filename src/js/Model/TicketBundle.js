import { STANDARD_NUMBER, ELEMENT } from "../Util/constants.js";
import { $$ } from "../Util/querySelector.js";

export default class TicketBundle {
  constructor() {
    this.ticketBundle = [];
  }

  makeAutoTicketBundle(ticketcounts) {
    for (let i = 0; i < ticketcounts; i++) {
      this.ticketBundle.push(this.generateRandomNumbers());
    }

    return this.ticketBundle;
  }

  getAutoTicketLength(autoPurchasePrice) {
    return this.makeAutoTicketBundle(
      autoPurchasePrice / STANDARD_NUMBER.ONE_TICKET_PRICE
    ).length;
  }

  addManualTicket(manualPurchaseLottoNumbers) {
    this.ticketBundle.push(manualPurchaseLottoNumbers);

    return this.ticketBundle;
  }

  getManualPurchaseLottoNumbers() {
    return Array.from($$(ELEMENT.MANUAL_PURCHASE_LOTTO_NUMBER)).map((number) =>
      Number(number.value)
    );
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
