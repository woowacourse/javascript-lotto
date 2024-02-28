import Money from "./Money.js";
import { LOTTO_NUMBER_MAX, LOTTO_NUMBER_MIN } from "./LottoNumber.js";
import Lotto, { LOTTO_NUMBER_LENGTH } from "./Lotto.js";

import Random from "../utils/random.js";
import CustomError from "../utils/CustomError.js";

export const LOTTO_PRICE = 1000;
export const MAX_LOTTO_BUYING_COUNT = 100;

class LottoSeller {
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
      throw new CustomError(`Money 객체만 입력 가능합니다.`);
    }
  }

  static #validateMinAmount(money) {
    if (money.getAmount() < LOTTO_PRICE) {
      throw new CustomError(
        `투입 금액은 최소 로또 한 개 가격(${LOTTO_PRICE}) 이상이어야 합니다.`
      );
    }
  }

  static #validateMaxAmount(money) {
    if (money.getAmount() > MAX_LOTTO_BUYING_COUNT * LOTTO_PRICE) {
      throw new CustomError(
        `로또는 최대 ${MAX_LOTTO_BUYING_COUNT}개까지 구매 가능합니다.`
      );
    }
  }

  static #calculateLottoCount(money) {
    return Math.floor(money.getAmount() / LOTTO_PRICE);
  }

  static #pickLottos(count) {
    return new Array(count).fill().map((_) => this.#pickLotto());
  }

  static #pickLotto() {
    const numbers = Random.pickNumbersBetween(
      LOTTO_NUMBER_MIN,
      LOTTO_NUMBER_MAX,
      LOTTO_NUMBER_LENGTH
    );

    return new Lotto(numbers);
  }
}

export default LottoSeller;
