import LOTTO_RULE from '../constants/rules/lottoRule';
class LottoMachine {
  #lottos;
  #count;

  constructor(money) {
    this.#count = money / LOTTO_RULE.LOTTO_MONEY_UNIT;
    this.#lottosDraw();
  }

  #lottosDraw() {
    this.#lottos = Array(this.#count).fill([]);
  }

  get lottos() {
    return this.#lottos;
  }

  get count() {
    return this.#count;
  }
}

export default LottoMachine;
