class LottoTicket {
  #ticket;

  constructor() {
    this.#ticket = [];
    this.#publishTicket();
  }

  #pickRandomNumberInRange() {
    return Math.floor(Math.random() * 45) + 1;
  }

  #publishTicket() {
    const emptyArr = Array.from({ length: 6 }).fill(0);
    emptyArr.forEach(() => {
      this.#checkDuplicated();
    });
  }

  #checkDuplicated() {
    const pickNumber = this.#pickRandomNumberInRange();
    if (this.#ticket.includes(pickNumber)) this.#checkDuplicated();
    if (!this.#ticket.includes(pickNumber)) this.#ticket.push(pickNumber);
  }

  get lottoTicket() {
    return this.#ticket.sort((prevNumber, nextNumber) => prevNumber - nextNumber);
  }
}

export default LottoTicket;
