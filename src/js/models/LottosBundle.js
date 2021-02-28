import Lotto from "./Lotto.js";

export default class LottosBundle extends Array {
  constructor() {
    super(0);
  }

  push(lotto) {
    if (!(lotto instanceof Lotto)) {
      return;
    }
    super.push(lotto);
  }

  getNumbersBundle() {
    return this.map((lotto) => lotto.getNumbers());
  }
}
