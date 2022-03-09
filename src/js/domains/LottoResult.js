export default class LottoResult {
  #grade;

  #price;

  constructor(grade, price) {
    this.#grade = grade;
    this.#price = price;
  }

  get grade() {
    return this.#grade;
  }

  get price() {
    return this.#price;
  }
}
