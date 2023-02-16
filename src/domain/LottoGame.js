import {
  PRIZE,
  MINIMUM_LOTTO_UNIT,
  MATCH_RANK,
  WINNING_ORDER,
} from '../data/Constants';
import { convertAscending, arrayToObjectThatValueZero } from '../utils/Utils';
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
      const correctResult = this.checkWinningNumbers(lotto.lottoNumber);
      lotto.setRank(MATCH_RANK[correctResult] ?? null);
    });
  }

  checkWinningNumbers(lottoNumber) {
    const matchCount = this.#win.winningNumber.reduce(
      (acc, cur) => (lottoNumber.includes(cur) ? acc + 1 : acc),
      0
    );
    if (matchCount === 5)
      return lottoNumber.includes(this.#win.bonusNumber) ? 'bonus' : matchCount;

    return matchCount;
  }

  getLottosWinRank() {
    return this.#lottos.map((lotto) => lotto.winRank);
  }

  getLottosWinCount() {
    const initialObject = arrayToObjectThatValueZero(WINNING_ORDER);
    return this.getLottosWinRank().reduce((acc, cur) => {
      if (cur === null) return acc;

      acc[cur] += 1;
      return acc;
    }, initialObject);
  }

  calculateTotalPrize(ranks = this.getLottosWinRank()) {
    return ranks.reduce(
      (acc, cur) => (PRIZE[cur] !== undefined ? (acc += PRIZE[cur]) : acc),
      0
    );
  }

  calculateEarningRate(
    price = this.#lottos.length * MINIMUM_LOTTO_UNIT,
    totalAmount = this.calculateTotalPrize()
  ) {
    return ((totalAmount / price) * 100).toFixed(1);
  }
}

export default LottoGame;
