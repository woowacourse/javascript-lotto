import LottoFactory from './lotto/LottoFactory';

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
    const amount = money / 1000;
    return Array(amount)
      .fill()
      .map(() => this.#lottoFactory.createRandomLotto());
  }
}

export default Seller;
