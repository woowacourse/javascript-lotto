import Validator from './Validator.js';
import Lotto from './Lotto.js';
import getRandomNumberArray from '../utils/getRandomNumberArray.js';
import WinningLotto from './WinningLotto.js';
import getProfitRate from '../utils/getProfitRate.js';

class LottoGame {
  #lottos = [];
  #winningLotto;

  purchaseLottos(money) {
    this.#validateMoneyInput(money);
    const lottoAmount = this.#getLottoAmount(money);
    const lottos = this.#getLottos(lottoAmount);
    this.#lottos = lottos;
  }

  generateWinningLotto(lottoNumber, bonusNumber) {
    this.#winningLotto = new WinningLotto(lottoNumber, bonusNumber);
  }

  getProfitRateOfPrize() {
    const purchaseMoney = this.#lottos.length * 1000;
    const winningMoney = this.#getWinningMoney();

    return getProfitRate(purchaseMoney, winningMoney);
  }

  getWinningRankResult() {
    const initRank = [0, 0, 0, 0, 0, 0];
    return this.#lottos.reduce((winningRankResult, lotto) => {
      const rank = this.#winningLotto.calculateRank(lotto);
      winningRankResult[rank] += 1;
      return winningRankResult.slice();
    }, initRank);
  }

  determineRetry(retryCommand) {
    const trimedCommand = retryCommand.trim().toLowerCase();
    Validator.validateRetryCommand(trimedCommand);

    if (trimedCommand === 'y') return true;
    return false;
  }

  #getWinningMoney() {
    const prize = [0, 2000000000, 30000000, 1500000, 50000, 5000];
    const winningRankResult = this.getWinningRankResult();

    return prize.reduce((winnigMoney, prizeByRank, index) => {
      winnigMoney += prizeByRank * winningRankResult[index];
      return winnigMoney;
    }, 0);
  }

  #validateMoneyInput(money) {
    Validator.validateNumberType(money);
    Validator.validateExactUnit(money, 1000);
  }

  #getLottoAmount(money) {
    return money / 1000;
  }

  #getLottos(lottoAmount) {
    return Array.from({ length: lottoAmount }, () => new Lotto(getRandomNumberArray(6)));
  }

  getLottos() {
    return [...this.#lottos];
  }
}

export default LottoGame;
