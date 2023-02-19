import LottoFactory from './lotto/LottoFactory';
import LottoResult from './LottoResult';

class Buyer {
  /** @type {number} */
  #money;

  /** @type {number} */
  #gainedMoney = 0;

  /** @type {Lotto[]} */
  #lottos = [];

  /**
   * @param {number} money
   */
  constructor(money) {
    this.#money = money;
  }

  /**
   * @param {LottoFactory} lottoFactory
   */
  buyLottos(lottoFactory = new LottoFactory()) {
    this.#lottos = lottoFactory.sellLottos(this.#money);
  }

  getLottos() {
    return this.#lottos;
  }

  /**
   * @param {LottoResult} lottoResult
   */
  receiveRewards(lottoResult) {
    const receivedRewards = lottoResult.countRewards(this.#lottos);
    this.#gainedMoney = receivedRewards.reduce(
      (money, [reward, count]) => money + reward.getMoney() * count,
      0,
    );
    return receivedRewards;
  }

  getProfitRate() {
    return this.#gainedMoney / this.#money;
  }
}

export default Buyer;
