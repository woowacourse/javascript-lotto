import Lotto from '../lotto/Lotto';
import LottoFactory from '../lotto/LottoFactory';

class Seller {
  /** @type {LottoFactory} */
  #lottoFactory;

  /**
   * @param {LottoFactory} lottoFactory
   */
  constructor(lottoFactory = new LottoFactory()) {
    this.#lottoFactory = lottoFactory;
  }

  /**
   * @param {number} money
   * @returns {Lotto[]}
   */
  sellLottos(money) {
    const amount = money / Lotto.PRICE;
    return Array(amount)
      .fill()
      .map(() => this.#lottoFactory.createRandomLotto());
  }
}

export default Seller;
