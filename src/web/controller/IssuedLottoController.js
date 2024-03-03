import getRandomLottoArray from "../../domain/getRandomLottoArray.js";
import { SYMBOL } from "../constants/viewMessage.js";

class IssuedLottoController {
  #issuedLottos = [];

  constructor(count) {
    this.#issuedLottos = getRandomLottoArray(count);
  }

  getIssuedLottos() {
    return [...this.#issuedLottos];
  }
}

export default IssuedLottoController;
