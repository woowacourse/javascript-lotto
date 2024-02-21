import { LOTTO_RULES } from '../constant/index.js';

export default class LottoMachine {
  #cost;

  constructor(cost) {
    this.#cost = cost;
  }

  get getLottoCount() {
    return this.#cost / LOTTO_RULES.cost;
  }
}
