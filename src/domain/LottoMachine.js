import Lotto from './Lotto';

import shuffle from '../utils/shuffle';
import { ALL_LOTTO_NUMBERS, LOTTO } from './constants/index';

class LottoMachine {
  #purchasePrice;

  #lottos;

  purchase(purchasePrice) {
    this.#purchasePrice = purchasePrice;

    this.validatePurchasePrice();
    this.issueLottos();
  }

  validatePurchasePrice() {
    if (!this.isValidPurchasePrice()) {
      throw Error('[ERROR] 구입 금액은 1000으로 나누어 떨어져야 합니다.');
    }
  }

  isValidPurchasePrice() {
    this.#purchasePrice = Number(this.#purchasePrice);

    return (
      this.#purchasePrice >= LOTTO.unitAmount &&
      this.#purchasePrice % LOTTO.unitAmount === 0
    );
  }

  issueLottos() {
    const lottoCount = this.#purchasePrice / LOTTO.unitAmount;

    this.#lottos = Array(lottoCount)
      .fill(0)
      .map(() => this.issueLotto());
  }

  issueLotto() {
    return new Lotto(
      shuffle(ALL_LOTTO_NUMBERS)
        .slice(0, 6)
        .sort((x, y) => x - y)
    );
  }

  get lottos() {
    return this.#lottos;
  }

  get price() {
    return this.#purchasePrice;
  }
}

export default LottoMachine;
