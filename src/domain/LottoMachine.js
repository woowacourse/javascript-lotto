import RandomGenerator from '../RandomGenerator';
import { isPositiveInteger } from '../validation';
import Lotto from './Lotto';
import WinningLotto from './WinningLotto';

class LottoMachine {
  static LOTTO_COST = 1000;
  static WIN_MONEY = { 0: 0, 1: 2000000000, 2: 30000000, 3: 1500000, 4: 50000, 5: 5000 };

  static ERROR_VALID_MONEY = `${LottoMachine.LOTTO_COST}원 단위의 금액을 입력하세요.`;

  #lottos;
  #winningLotto;
  #winCount = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  constructor(money) {
    this.#lottos = this.generateLottos(money);
  }

  calcLottoAmount(money) {
    const lottoAmount = money / LottoMachine.LOTTO_COST;

    if (!isPositiveInteger(lottoAmount)) throw new Error(LottoMachine.ERROR_VALID_MONEY);

    return lottoAmount;
  }

  generateLottos(money) {
    const amount = this.calcLottoAmount(money);
    return Array.from({ length: amount }, () => {
      return new Lotto(RandomGenerator.pickRandomNumbers());
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
      winPrizeMoney: LottoMachine.WIN_MONEY,
    };
  }

  calcProfitRate(prizes) {
    const totalWinMoney = prizes.reduce((acc, cur) => acc + LottoMachine.WIN_MONEY[cur], 0);

    return totalWinMoney / (this.#lottos.length * LottoMachine.LOTTO_COST);
  }
}

export default LottoMachine;
