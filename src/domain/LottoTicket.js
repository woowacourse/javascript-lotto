import { LOTTO_SYMBOL } from '../constant/symbols';

class LottoTicket {
  #pickRandomNumberInRange() {
    const pickNumber = Math.floor(Math.random() * LOTTO_SYMBOL.RANGE_MAX) + 1;
    return pickNumber;
  }

  publishTicket() {
    const emptyArr = Array.from({ length: LOTTO_SYMBOL.COUNT });
    const ticket = [];
    emptyArr.forEach(() => {
      this.#putUniqueNumber(ticket);
    });
    return this.#sortWinningNumbers(ticket);
  }

  #putUniqueNumber(ticket) {
    const randomNumber = this.#pickRandomNumberInRange();
    if (ticket.includes(randomNumber)) {
      this.#putUniqueNumber(ticket);
    } else {
      ticket.push(randomNumber);
    }
  }

  #sortWinningNumbers(winningNumbers) {
    return winningNumbers.sort((prevNumber, nextNumber) => prevNumber - nextNumber);
  }
}

export default LottoTicket;
