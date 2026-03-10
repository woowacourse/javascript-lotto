import Lotto from "./models/Lotto.js";

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
    if (money < LottoMachine.UNIT) {
      throw new Error(LottoMachine.ERROR.NOT_ENOUGH);
    }

    const count = Math.floor(money / LottoMachine.UNIT);
    return Array.from({ length: count }, () => new Lotto(this.#picker()));
  }
}
