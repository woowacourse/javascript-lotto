import CONFIG from './constants/config';
import Lotto from './Lotto';
import pickNumberInList from './utils/pickNumberInList';

class Machine {
  #lottos;

  constructor() {
    this.#lottos = [];
  }

  createLottos(money) {
    const lottoPrice = 1000;
    const quantity = money / lottoPrice;
    this.#lottos = Array.from({ length: quantity }).map(() => this.createLotto());
  }

  createLotto() {
    const randomNumbers = pickNumberInList(
      CONFIG.MIN.LOTTO_NUMBER,
      CONFIG.MAX.LOTTO_NUMBER,
    );
    return new Lotto(randomNumbers);
  }

  getLottos() {
    return this.#lottos;
  }
}

export default Machine;
