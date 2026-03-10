export default class LottoMachine {
  static UNIT = 1000;

  static ERROR = {
    NOT_ENOUGH: "돈이 너무 적습니다",
  };

  #picker;

  constructor(picker) {
    this.#picker = picker;
  }

  buyLottos(money) {}
}
