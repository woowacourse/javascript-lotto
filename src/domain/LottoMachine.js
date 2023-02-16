import RandomGenerator from '../RandomGenerator';
import { isPositiveInteger } from '../validation';
import Lotto from './Lotto';
import WinningLotto from './WinningLotto';

class LottoMachine {
  static LOTTO_COST = 1000;
  static WIN_PRIZE_MONEY = { 0: 0, 1: 2000000000, 2: 30000000, 3: 1500000, 4: 50000, 5: 5000 };
  #lottos;
  #winningLotto;
  #winCount = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  constructor(money) {
    this.#lottos = this.generateLottos(money);
  }

  getPrizes() {
    return this.#lottos.map((lotto) => this.#winningLotto.judgePrize(lotto));
  }

  calcLottoAmount(money) {
    const lottoAmount = money / LottoMachine.LOTTO_COST;
    if (!isPositiveInteger(lottoAmount)) throw new Error('유효하지 않은 금액입니다.');
    return lottoAmount;
  }

  generateLottos(money) {
    const amount = this.calcLottoAmount(money);
    return Array.from({ length: amount }, () => {
      return new Lotto(RandomGenerator.pickRandomNumbers());
    });
  }

  setWinningLotto(lottoNumbers) {
    const lotto = new Lotto(lottoNumbers);
    this.#winningLotto = new WinningLotto(lotto);
  }

  setBonusNumber(bonusNumber) {
    this.#winningLotto.setBonusNumber(bonusNumber);
  }

  getLottoNumbers() {
    return this.#lottos.map((lotto) => lotto.getNumbers());
  }

  makeHitPrize() {
    this.getPrizes().forEach((prize) => {
      this.#winCount[prize] += 1;
    });
  }

  calcStatstics() {
    this.makeHitPrize();
    const profitRate = this.calcProfitRate();
    return {
      winCount: this.#winCount,
      profitRate,
      winPrizeMoney: LottoMachine.WIN_PRIZE_MONEY,
    };
  }

  calcProfitRate() {
    const totalWinMoney = this.getPrizes().reduce(
      (acc, cur) => acc + LottoMachine.WIN_PRIZE_MONEY[cur],
      0,
    );
    return totalWinMoney / (this.#lottos.length * LottoMachine.LOTTO_COST);
  }
}

export default LottoMachine;
