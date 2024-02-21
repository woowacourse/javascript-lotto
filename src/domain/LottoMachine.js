import LOTTO_RULE from '../constants/rules/lottoRule';
import BonusNumber from './BonusNumber';
import Lotto from './Lotto';
class LottoMachine {
  #lottos;
  #count; //TODO: count 분리
  #winningLotto;
  #bonusNumber;

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

  set winningLotto(numbers) {
    this.#winningLotto = new Lotto(numbers);
  }

  set bonusNumber(number) {
    this.#bonusNumber = new BonusNumber(number, this.#winningLotto);
  }

  get lottos() {
    return this.#lottos;
  }

  get count() {
    return this.#count;
  }
}

export default LottoMachine;
