import LottoFactory from './LottoFactory';
import Validation from '../Validation';

class Buyer {
  #money;
  #lottos;

  constructor(money) {
    Validation.validateMoney(money);
    this.#money = money;
  }

  buyLottos(lottoFactory = new LottoFactory()) {
    this.#lottos = lottoFactory.sellLottos(this.#money);
  }

  getLottos() {
    return this.#lottos;
  }

  receiveRewards(lottoResult) {
    const receivedRewards = lottoResult.countRewards(this.#lottos);
    return receivedRewards;
  }

  getProfitRate(lottoResult) {
    const gainedMoney = this.receiveRewards(lottoResult).reduce(
      (money, { reward, count }) => money + reward.getMoney() * count,
      0,
    );
    return gainedMoney / this.#money;
  }
}

export default Buyer;
