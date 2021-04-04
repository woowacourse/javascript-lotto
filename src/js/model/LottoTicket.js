import Lotto from './Lotto.js';

export default class LottoTicket {
  constructor() {
    this.lottos = [];
    this.rankCounts = [];
    this.earningRate = 0;
  }

  getLottos() {
    return this.lottos;
  }

  addAutoPurchaseLottos(count) {
    const remainingLottos = Array.from({ length: count }, () => {
      const lotto = new Lotto();
      lotto.initNumbers();
      return lotto;
    });

    this.lottos = [...this.lottos, ...remainingLottos];
  }

  addManualPurchaseLotto(newLotto) {
    const lotto = new Lotto();
    lotto.numbers = newLotto;

    this.lottos = [...this.lottos, lotto];
  }

  get rankCounts() {
    return this._rankCounts;
  }

  set rankCounts(currentRankCounts) {
    this._rankCounts = currentRankCounts;
  }

  get earningRate() {
    return this._earningRate;
  }

  set earningRate(currentEarningRate) {
    this._earningRate = currentEarningRate;
  }
}
