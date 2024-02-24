class LottoTicket {
  #pickRandomNumberInRange() {
    const pickNumber = Math.floor(Math.random() * 45) + 1;
    return pickNumber;
  }

  publishTicket() {
    const emptyArr = Array.from({ length: 6 }).fill(0);
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
