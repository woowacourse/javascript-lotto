import Random from "../utils/random.js";
import Lotto from "./Lotto.js";
import LottoNumber from "./LottoNumber.js";
import Money from "./Money.js";

class LottoSeller {
  static LOTTO_PRICE = 1000;

  static sell(money) {
    this.#validateMoney(money);

    const lottoCount = this.#calculateLottoCount(money);

    return this.#pickLottos(lottoCount);
  }

  static #validateMoney(money) {
    this.#validateTypeMoney(money);
    this.validateMinimumAmount(money);
  }

  static #validateTypeMoney(value) {
    if (!(value instanceof Money)) {
      throw new Error(`[ERROR] Money 객체만 입력 가능합니다.`);
    }
  }

  static validateMinimumAmount(money) {
    if (money.getAmount() < this.LOTTO_PRICE) {
      throw new Error(
        `[ERROR] 투입 금액은 최소 로또 한 개 가격(${this.LOTTO_PRICE}) 이상이어야 합니다.`
      );
    }
  }

  static #calculateLottoCount(money) {
    return Math.floor(money.getAmount() / LottoSeller.LOTTO_PRICE);
  }

  static #pickLottos(count) {
    return new Array(count).fill().map((_) => this.#pickLotto());
  }

  static #pickLotto() {
    const numbers = Random.pickNumbersBetween(
      LottoNumber.MIN,
      LottoNumber.MAX,
      Lotto.NUMBER_COUNT
    );

    return new Lotto(numbers);
  }
}

export default LottoSeller;
