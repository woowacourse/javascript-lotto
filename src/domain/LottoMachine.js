import LOTTO_RULE from '../constants/rules/lottoRule';
import Lotto from './Lotto';
class LottoMachine {
  #lottos;
  #count;

  constructor(money) {
    //TODO: money.amount 리팩토링?
    this.#count = money.amount / LOTTO_RULE.LOTTO_MONEY_UNIT;
    this.#drawLottos();
  }

  #drawLottos() {
    this.#lottos = Array(this.#count).fill([]);
    this.#lottos.forEach((_, idx) => {
      this.#lottos[idx] = new Lotto();
    });
  }

  get lottos() {
    return this.#lottos;
  }

  get count() {
    return this.#count;
  }
}

export default LottoMachine;
