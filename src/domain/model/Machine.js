import Lotto from './Lotto.js';
import pickNumberInList from '../../utils/pickNumberInList.js';
import { LOTTO_RULE } from '../constants.js';

class Machine {
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
    const randomNumbers = pickNumberInList();
    return new Lotto(randomNumbers);
  }

  getLottos() {
    return this.#lottos;
  }

  getLottoQuantity() {
    return this.#lottos.length;
  }
}

export default Machine;
