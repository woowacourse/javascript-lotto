import RandomGenerator from '../util/RandomGenerator';
import {
  LOTTO_COST,
  WIN_PRIZE_MONEY,
  ERROR_INVALID_AMOUNT,
  LOTTO_NUMBER_RANGE_MAX,
  LOTTO_NUMBER_SIZE,
  MISS,
  FIRST,
  SECOND,
  THIRD,
  FOURTH,
  FIFTH,
} from '../util/constants';
import { isPositiveInteger } from '../validation';
import Lotto from './Lotto';
import WinningLotto from './WinningLotto';

class LottoMachine {
  #lottos;
  #winningLotto;
  #winCount = {
    [MISS]: 0,
    [FIRST]: 0,
    [SECOND]: 0,
    [THIRD]: 0,
    [FOURTH]: 0,
    [FIFTH]: 0,
  };

  constructor(money) {
    this.#lottos = this.generateLottos(money);
  }

  calcLottoAmount(money) {
    const lottoAmount = money / LOTTO_COST;
    if (!isPositiveInteger(lottoAmount)) throw new Error(ERROR_INVALID_AMOUNT);
    return lottoAmount;
  }

  generateLottos(money) {
    const amount = this.calcLottoAmount(money);
    return Array.from({ length: amount }, () => {
      return new Lotto(
        RandomGenerator.pickRandomNumbers(LOTTO_NUMBER_RANGE_MAX, LOTTO_NUMBER_SIZE),
      );
    });
  }

  generateWinningLotto(lottoNumbers) {
    const lotto = new Lotto(lottoNumbers);
    this.#winningLotto = new WinningLotto(lotto);
  }

  setBonusNumber(bonusNumber) {
    this.#winningLotto.setBonusNumber(bonusNumber);
  }

  getLottoNumbers() {
    return this.#lottos.map((lotto) => lotto.getNumbers());
  }

  getPrizes() {
    return this.#lottos.map((lotto) => this.#winningLotto.getWinRank(lotto));
  }

  addWinCount(prizes) {
    prizes.forEach((prize) => {
      this.#winCount[prize] += 1;
    });
  }

  calcStatstics() {
    const prizes = this.getPrizes();
    this.addWinCount(prizes);
    const profitRate = this.calcProfitRate(prizes);
    return {
      winCount: this.#winCount,
      profitRate,
      winPrizeMoney: WIN_PRIZE_MONEY,
    };
  }

  calcProfitRate(prizes) {
    const totalWinMoney = prizes.reduce((acc, cur) => acc + WIN_PRIZE_MONEY[cur], 0);
    return totalWinMoney / (this.#lottos.length * LOTTO_COST);
  }
}

export default LottoMachine;
