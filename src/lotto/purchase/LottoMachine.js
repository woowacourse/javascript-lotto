import Lotto from "../shared/domain/Lotto.js";

export default class LottoMachine {
  static UNIT = 1000;

  static ERROR = {
    NOT_ENOUGH: "돈이 너무 적습니다",
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

    const count = Math.floor(amount / LottoMachine.UNIT);
    return Array.from({ length: count }, () => new Lotto(this.#picker()));
  }
}
