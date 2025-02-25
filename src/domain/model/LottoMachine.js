import Lotto from './Lotto.js';
import pickNumberInList from '../../utils/pickNumberInList.js';
import { LOTTO_RULE } from '../constants.js';

class LottoMachine {
  #lottos;

  constructor() {
    this.#lottos = [];
  }

  createLottos(money) {
    const quantity = money / LOTTO_RULE.PRICE;
    this.#lottos = Array.from({ length: quantity }).map(() =>
      this.createLotto(),
    );
  }

  createLotto() {
    const randomNumbers = pickNumberInList(LOTTO_RULE).sort((a, b) => a - b);
    return new Lotto(randomNumbers);
  }

  getLottos() {
    return this.#lottos;
  }

  getLottoQuantity() {
    return this.#lottos.length;
  }
}

export default LottoMachine;
