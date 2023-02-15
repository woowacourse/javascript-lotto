import LottoFactory from './LottoFactory';

class Buyer {
  constructor(money) {
    this.money = money;
  }

  buyLottos() {
    const lottoFactory = new LottoFactory();
    this.lottos = lottoFactory.sellLottos(this.money);
  }

  getLottos() {
    return this.lottos;
  }
}

export default Buyer;
