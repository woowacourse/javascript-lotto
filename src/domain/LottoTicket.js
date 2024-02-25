import { RANDOM, LOTTO } from '../constants';

class LottoTicket {
  #tickets;

  constructor() {
    this.#tickets = [];
    this.#publishTicket();
  }

  #pickRandomNumberInRange() {
    return Math.floor(Math.random() * RANDOM.MAX) + RANDOM.MIN;
  }

  #publishTicket() {
    Array.from({ length: LOTTO.SIZE }).forEach(() => {
      this.#handleDuplicate(this.#pickRandomNumberInRange());
    });
  }

  #handleDuplicate(pickNumber) {
    while (this.#tickets.includes(pickNumber)) {
      pickNumber = this.#pickRandomNumberInRange();
    }
    this.#tickets.push(pickNumber);
  }

  get tickets() {
    return this.#tickets.sort((prevNumber, nextNumber) => prevNumber - nextNumber);
  }
}

export default LottoTicket;
