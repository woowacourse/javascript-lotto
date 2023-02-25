import LOTTO from '../constants/lotto';
import { RANK, PRIZE } from '../constants/rank';
import Lotto from './model/Lotto';
import WinningLotto from './model/WinningLotto';

class LottoService {
  #lottos;
  #winningLotto;

  purchaseLottos(amount) {
    this.#lottos = Array.from({ length: amount }, () => new Lotto());
  }

  getLottosNumbers() {
    return this.#lottos.map((lotto) => lotto.getNumbers());
  }

  setWinningLotto(winNumbers, bonusNumber) {
    this.#winningLotto = new WinningLotto(new Lotto(winNumbers), bonusNumber);
  }

  getStatstics() {
    const prizes = { ...RANK };
    this.#lottos.forEach((lotto) => {
      const match = this.#winningLotto.countMatch(lotto);
      if (match >= PRIZE.FIFTH) prizes[match].count += 1;
    });
    return Object.entries(prizes)
      .sort(([rankA], [rankB]) => rankA - rankB)
      .map(([, stat]) => stat);
  }

  getProfitRate(statstics) {
    const totalReward = statstics.reduce((sum, { reward, count }) => sum + reward * count, 0);
    const principal = this.#lottos.length * LOTTO.UNIT;
    const profit = totalReward - principal;

    return (profit / principal) * 100;
  }
}

export default LottoService;
