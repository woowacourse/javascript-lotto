class LottoTicket {
  #pickRandomNumberInRange() {
    const pickNumber = Math.floor(Math.random() * 45) + 1;
    return pickNumber;
  }

  publishTicket() {
    const emptyArr = Array.from({ length: 6 }).fill(0);
    const ticket = [];
    emptyArr.forEach(() => {
      this.#hasDuplicatedNumber(ticket);
    });
    return this.#sortWinningNumbers(ticket);
  }

  #hasDuplicatedNumber(ticket) {
    const randomNumber = this.#pickRandomNumberInRange();
    if (ticket.includes(randomNumber)) {
      this.#hasDuplicatedNumber(ticket);
    } else {
      ticket.push(randomNumber);
    }
  }

  #sortWinningNumbers(winningNumbers) {
    return winningNumbers.sort((prevNumber, nextNumber) => prevNumber - nextNumber);
  }
}

export default LottoTicket;
