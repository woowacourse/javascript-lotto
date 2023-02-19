import LottoResult from '../LottoResult';
import Reward from '../reward/Reward';
import Seller from './Seller';

class Buyer {
  /** @type {number} */
  #money;

  /** @type {Reward[]} */
  #rewards = [];

  /** @type {Lotto[]} */
  #lottos = [];

  /**
   * @param {number} money
   */
  constructor(money) {
    this.#money = money;
  }

  /**
   * @param {Seller} seller
   */
  buyLottos(seller) {
    this.#lottos = [...this.#lottos, ...seller.sellLottos(this.#money)];
  }

  getLottos() {
    return this.#lottos;
  }

  /**
   * @param {LottoResult} lottoResult
   */
  receiveRewards(lottoResult) {
    this.#rewards = [
      ...this.#rewards,
      ...this.#lottos
        .map((lotto) => lottoResult.findReward(lotto))
        .filter((lotto) => lotto !== null),
    ];
    this.#lottos = [];
  }

  getRewards() {
    return this.#rewards;
  }

  getProfitRate() {
    const sumGainedMoneyFn = (gainedMoney, reward) => gainedMoney + reward.getMoney();
    return this.#rewards.reduce(sumGainedMoneyFn, 0) / this.#money;
  }
}

export default Buyer;
