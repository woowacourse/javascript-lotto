import Random from "../utils/random.js";
import Lotto from "./Lotto.js";
import LottoNumber from "./LottoNumber.js";
import Money from "./Money.js";

class LottoSeller {
  static LOTTO_PRICE = 1000;
  static MAX_LOTTO_COUNT = 100;

  static sell(money) {
    this.#validateLottoMoney(money);

    const lottoCount = this.#calculateLottoCount(money);

    return this.#pickLottos(lottoCount);
  }

  static #validateLottoMoney(money) {
    this.#validateTypeMoney(money);
    this.#validateMinAmount(money);
    this.#validateMaxAmount(money);
  }

  static #validateTypeMoney(value) {
    if (!(value instanceof Money)) {
      throw new Error(`[ERROR] Money 객체만 입력 가능합니다.`);
    }
  }

  static #validateMinAmount(money) {
    if (money.getAmount() < this.LOTTO_PRICE) {
      throw new Error(
        `[ERROR] 투입 금액은 최소 로또 한 개 가격(${this.LOTTO_PRICE}) 이상이어야 합니다.`
      );
    }
  }

  static #validateMaxAmount(money) {
    if (money.getAmount() > this.MAX_LOTTO_COUNT * this.LOTTO_PRICE) {
      throw new Error(
        `[ERROR] 로또는 최대 ${this.MAX_LOTTO_COUNT}개까지 구매 가능합니다.`
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
