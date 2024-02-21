export default class LottoMachine {
  #cost;

  constructor(cost) {
    this.#cost = cost;
  }

  get getLottoCount() {
    return this.#cost / 1000;
  }
}
