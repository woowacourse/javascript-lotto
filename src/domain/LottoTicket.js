class LottoTicket {
  #ticket;

  constructor() {
    this.#ticket = [];
    this.#publishTicket();
  }

  #pickRandomNumberInRange() {
    const pickNumber = Math.floor(Math.random() * 45) + 1;
    this.#hasDuplicatedNumber(pickNumber);
  }

  #publishTicket() {
    const emptyArr = Array.from({ length: 6 }).fill(0);
    emptyArr.forEach(() => {
      this.#hasDuplicatedNumber();
    });
  }

  #hasDuplicatedNumber(pickNumber) {
    if (this.#ticket.includes(pickNumber)) this.#pickRandomNumberInRange();
    if (!this.#ticket.includes(pickNumber)) this.#ticket.push(pickNumber);
  }

  get ticket() {
    return this.#ticket.sort((prevNumber, nextNumber) => prevNumber - nextNumber);
  }
}

export default LottoTicket;
