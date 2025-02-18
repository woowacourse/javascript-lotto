//@ts-check

import {
  LOTTO_PRICE,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
  OUTPUT_MESSAGES,
} from "./lib/constants.js";
import { generateRandomNumber } from "./lib/utils.js";
import InputView from "./views/InputView.js";

class App {
  constructor() {}

  async run() {
    const purchaseAmount = await InputView.readPurchaseAmount();
    const purchaseCount = purchaseAmount / LOTTO_PRICE;

    console.log(OUTPUT_MESSAGES.purchaseCount(purchaseCount));
    console.log(this.createLotto(purchaseCount));

    const winNumbers = await InputView.readWinNumbers();
    const bonusNumber = await InputView.readBonusNumber();
  }

  createLottoNumber() {
    return new Array(6)
      .fill("")
      .map((_) => generateRandomNumber(MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER));
  }

  createLotto(purchaseCount) {
    return Array.from({ length: purchaseCount }, () => {
      return this.createLottoNumber();
    });
  }
}

export default App;
