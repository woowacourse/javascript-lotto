import Lotto from "../../domain/Lotto.js";
export default class LottoMachine {
  static UNIT = 1000;

  static ERROR = {
    NOT_ENOUGH: "돈이 너무 적습니다",
    INVALID_UNIT: "구매 단위로 구매 가능합니다",
  };

  #picker;

  constructor(picker) {
    this.#picker = picker;
  }

  buyLottos(money) {
    const amount = money.getAmount();
    if (amount < LottoMachine.UNIT) {
      throw new Error(LottoMachine.ERROR.NOT_ENOUGH);
    }

    if (amount % LottoMachine.UNIT !== 0) {
      throw new Error(LottoMachine.ERROR.INVALID_UNIT);
    }

    const count = Math.floor(amount / LottoMachine.UNIT);
    const lottos = Array.from(
      { length: count },
      () => new Lotto(this.#pickLottoNumbers()),
    );

    return { lottos, purchasedMoney: money };
  }

  #pickLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < Lotto.POLICY.SIZE) {
      numbers.add(this.#picker(Lotto.POLICY.MIN_RANGE, Lotto.POLICY.MAX_RANGE));
    }
    return [...numbers].sort((a, b) => a - b);
  }
}
