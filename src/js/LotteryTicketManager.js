import LotteryTicket from './LotteryTicket';

export default class LotteryTicketManager {
  #tickets;

  constructor() {
    this.#tickets = [];
  }

  initialize() {
    this.#tickets.length = 0;
  }

  get tickets() { return this.#tickets; }

  generateNewLottos(count) {
    let currentCount = 0;
    while ( currentCount < count ) {
      this.#tickets.push(new LotteryTicket());
      currentCount += 1;
    }
  }
}
