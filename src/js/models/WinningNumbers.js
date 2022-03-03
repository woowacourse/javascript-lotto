export default class WinningLotto {
  #numbers;

  constructor() {
    this.#numbers = new Set();
  }

  get numbers() {
    return this.#numbers;
  }

  pushNumber(number) {
    this.#numbers.add(number);
  }
}
