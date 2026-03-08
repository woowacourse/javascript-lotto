class Lotto {
  #number = [];

  constructor(number) {
    this.#number = number;
  }
  getNumber() {
    return [...this.#number];
  }
}

export default Lotto;
