import {
  PRIZE,
  MINIMUM_LOTTO_UNIT,
  MATCH_RANK,
  WINNING_ORDER,
  LOTTO_LENGTH,
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
} from '../data/Constants';
import { arrayToObjectThatValueZero, deduplicateArray } from '../utils/Utils';
import Win from './Win';
import Lotto from './Lotto';

class LottoGame {
  #win;
  #lottos;

  purchaseLottos(price) {
    const lottoCount = price / MINIMUM_LOTTO_UNIT;

    this.#lottos = Array.from(
      { length: lottoCount },
      () => new Lotto(this.issueLotteryNumber())
    );
  }

  issueLotteryNumber() {
    return deduplicateArray(LOTTO_LENGTH, [MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER]);
  }

  initializeWin(winningNumber) {
    this.#win = new Win(winningNumber);
  }

  setBonusNumber(bonusNumber) {
    this.#win.bonusNumber = bonusNumber;
  }

  getLottoNumbers() {
    return this.#lottos.map((lotto) => lotto.lottoNumber);
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
