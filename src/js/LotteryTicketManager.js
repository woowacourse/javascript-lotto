import { ERROR_MESSAGE } from './constants/constants';
import LotteryTicket from './LotteryTicket';

export default class LotteryTicketManager {
  #tickets;

  constructor() {
    this.#tickets = [];
  }

  get tickets() { return this.#tickets; }

  initialize() {
    this.#tickets.length = 0;
  }

  generateNewLottos(count) {
    let currentCount = 0;
    while ( currentCount < count ) {
      this.#tickets.push(new LotteryTicket());
      currentCount += 1;
    }
  }

  checkPurchasedTicketExist() {
    if ( this.#tickets.length === 0 )
      throw new Error(ERROR_MESSAGE.NO_PURCHASED_TICKET);
  }
}
