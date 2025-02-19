import { PURCHASE_UNIT } from "./const";
import Lotto from "./Lotto";

class LottoManager {
  #price;
  #lottos;

  constructor(price) {
    this.#price = price;
    this.#lottos = [];
  }

  generateLottos() {
    for (let i = 0; i < this.#price / PURCHASE_UNIT; i++) {
      const numbers = [1, 2, 3, 4, 5, 6]; //TODO
      this.#lottos.push(new Lotto(numbers));
    }
  }

  get lottos() {
    return this.#lottos;
  }

  validateBonusNumberUnique(winningNumbers, bonusNumber) {
    if (winningNumbers.includes(bonusNumber))
      throw new Error("보너스 번호는 당첨 번호와 중복되면 안됩니다.");
  }
}

export default LottoManager;
