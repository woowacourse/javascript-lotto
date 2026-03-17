import PurchasedLotto from "../domain/PurchasedLotto.js";
import WinningLotto from "../domain/WinningLotto.js";
import { validatePurchaseAmount } from "../utils/validator.js";
import { getReturnRate } from "../utils/getReturnRate.js";

class WebLottoManager {
  #purchasedLotto = null;
  #purchaseAmount = 0;
  #generateRandomNumbers;

  constructor(generateRandomNumbers) {
    this.#generateRandomNumbers = generateRandomNumbers;
  }

  purchase(amount) {
    validatePurchaseAmount(amount);
    this.#purchaseAmount = amount;
    const numbers = Array.from(
      { length: amount / 1000 },
      this.#generateRandomNumbers
    );
    this.#purchasedLotto = new PurchasedLotto(numbers);
    return {
      count: this.#purchaseAmount / 1000,
      lottos: this.#purchasedLotto.getLottos(),
    };
  }

  getResult(winningNumbers, bonusNumber) {
    if (this.#purchaseAmount === 0 || this.#purchasedLotto === null)
      throw new Error("[ERROR]");
    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
    const prizeList = [0, 0, 0, 0, 0, 0];
    this.#purchasedLotto.getLottos().forEach((lotto) => {
      const rank = winningLotto.getRank(lotto);
      if (rank !== null && rank >= 1 && rank <= 5) prizeList[rank] += 1;
    });
    return {
      prizeList: prizeList,
      roi: getReturnRate(prizeList, this.#purchaseAmount),
    };
  }

  reset() {
    this.#purchasedLotto = null;
    this.#purchaseAmount = 0;
  }
}

export default WebLottoManager;
