import { PRIZE, MINIMUM_LOTTO_UNIT, MATCH_RANK } from '../data/Constants';
import { convertAscending } from '../utils/Utils';
import Win from './Win';
import Lotto from './Lotto';

class LottoGame {
  #win;
  #lottos;

  constructor() {}

  initializeLottos(price) {
    const lottoCount = price / MINIMUM_LOTTO_UNIT;

    this.#lottos = Array.from({ length: lottoCount }, () => new Lotto());
  }

  initializeWin(winningNumber) {
    this.#win = new Win(winningNumber);
  }

  getOrderedLottos() {
    return this.#lottos.map((lotto) => convertAscending(lotto.lottoNumber));
  }

  setBonusNumber(bonusNumber) {
    this.#win.bonusNumber = bonusNumber;
  }

  setLottoRank() {
    this.#lottos.forEach((lotto) => {
      const correctResult = this.checkWinningNumbers(lotto);
      lotto.setRank(MATCH_RANK[correctResult] ?? null);
    });
  }

  checkWinningNumbers(lotto) {
    const lottoNumber = lotto.lottoNumber;
    const matchCount = this.#win.winningNumber.reduce((acc, cur) => {
      return lottoNumber.includes(cur) ? acc + 1 : acc;
    }, 0);

    if (matchCount === 5) {
      return lottoNumber.includes(this.#win.bonusNumber) ? 'bonus' : matchCount;
    }

    return matchCount;
  }

  calculateEarningRate(price, totalAmount) {
    return (totalAmount / price).toFixed(2);
  }

  calculateTotalPrize(ranks) {
    return ranks.reduce(
      (acc, cur) => (PRIZE[cur] !== undefined ? (acc += PRIZE[cur]) : acc),
      0
    );
  }
}

export default LottoGame;
