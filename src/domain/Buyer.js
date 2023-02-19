import LottoFactory from './LottoFactory';
import Validation from '../Validation';

class Buyer {
  constructor(money) {
    Validation.validateMoney(money);
    this.money = money;
    this.gainedMoney = 0;
  }

  buyLottos(lottoFactory = new LottoFactory()) {
    this.lottos = lottoFactory.sellLottos(this.money);
  }

  getLottos() {
    return this.lottos;
  }

  receiveRewards(lottoResult) {
    const receivedRewards = lottoResult.countRewards(this.lottos);
    this.gainedMoney = receivedRewards.reduce(
      (money, { reward, count }) => money + reward.getMoney() * count,
      0,
    );
    return receivedRewards;
  }

  getProfitRate() {
    return this.gainedMoney / this.money;
  }
}

export default Buyer;
