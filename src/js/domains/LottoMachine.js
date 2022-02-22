import { LOTTO } from "../constants/constants.js";

export default class LottoMachine {
  #inputPrice = 0;

  get inputPrice() {
    return this.#inputPrice;
  }

  set inputPrice(money) {
    this.#inputPrice = money;
  }

  calculateLottoQuantity() {
    return this.#inputPrice / LOTTO.PRICE;
  }
}
