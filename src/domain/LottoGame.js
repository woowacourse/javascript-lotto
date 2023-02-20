import {
  PRIZE,
  MINIMUM_LOTTO_UNIT,
  MATCH_RANK,
  WINNING_ORDER,
  CONVERT_RANK_TO_STRING,
} from '../data/Constants';
import { convertAscending, arrayToObjectThatValueZero } from '../utils/Utils';
import Win from './Win';
import Lotto from './Lotto';

class LottoGame {
  #win;
  #lottos;

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
      lotto.setRank(correctResult);
    });
  }

  checkMatchCount(lottoNumber) {
    return this.#win.winningNumber.reduce(
      (acc, cur) => (lottoNumber.includes(cur) ? acc + 1 : acc),
      0
    );
  }

  checkWinningNumbers(lottoNumber) {
    return this.convertMatchCount(
      this.checkMatchCount(lottoNumber),
      lottoNumber
    );
  }

  convertMatchCount(matchCount, lottoNumber) {
    if (matchCount < 3) return MATCH_RANK.NONE;
    if (matchCount === 3) return MATCH_RANK.FIFTH;
    if (matchCount === 4) return MATCH_RANK.FOURTH;
    if (matchCount === 5 && lottoNumber.includes(this.#win.bonusNumber))
      return MATCH_RANK.SECOND;
    if (matchCount === 5) return MATCH_RANK.THIRD;
    if (matchCount === 6) return MATCH_RANK.FIRST;
  }

  getLottosWinRank() {
    return this.#lottos.map((lotto) => CONVERT_RANK_TO_STRING[lotto.winRank]);
  }

  getLottosWinCount() {
    const initialObject = arrayToObjectThatValueZero(WINNING_ORDER);
    const lottoWinRank = this.getLottosWinRank();
    lottoWinRank.forEach((rank) => (initialObject[rank] += 1));
    return initialObject;
  }

  calculateTotalPrize(ranks = this.getLottosWinRank()) {
    return ranks.reduce((acc, cur) => (acc += PRIZE[cur]), 0);
  }

  calculateEarningRate(
    price = this.#lottos.length * MINIMUM_LOTTO_UNIT,
    totalAmount = this.calculateTotalPrize()
  ) {
    return ((totalAmount / price) * 100).toFixed(1);
  }
}

export default LottoGame;
