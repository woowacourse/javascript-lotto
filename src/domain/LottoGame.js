import Validator from './Validator.js';
import Lotto from './Lotto.js';
import WinningLotto from './WinningLotto.js';
import getProfitRate from '../utils/getProfitRate.js';
import { COMMAND, LOTTO_PRICE, PRIZE, LOTTO_NUMBER } from '../utils/constants.js';

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
    const purchaseMoney = this.#lottos.length * LOTTO_PRICE;
    const winningMoney = this.#getWinningMoney();

    return getProfitRate(purchaseMoney, winningMoney);
  }

  getWinningRankResult() {
    const initRank = [PRIZE.NONE, PRIZE.FIRST, PRIZE.SECOND, PRIZE.THIRD, PRIZE.FORTH, PRIZE.FIFTH];
    const rankResult = { [PRIZE.NONE]: 0, [PRIZE.FIRST]: 0, [PRIZE.SECOND]: 0, [PRIZE.THIRD]: 0, [PRIZE.FORTH]: 0, [PRIZE.FIFTH]: 0 };
    return this.#lottos.reduce((winningRankResult, lotto) => {
      const rank = this.#winningLotto.calculateRank(lotto);
      winningRankResult[initRank[rank]] += 1;
      return winningRankResult;
    }, rankResult);
  }

  determineRetry(retryCommand) {
    const trimedCommand = retryCommand.trim().toLowerCase();
    Validator.validateRetryCommand(trimedCommand);

    return trimedCommand === COMMAND.RETRY;
  }

  #getWinningMoney() {
    const prize = [PRIZE.NONE, PRIZE.FIRST, PRIZE.SECOND, PRIZE.THIRD, PRIZE.FORTH, PRIZE.FIFTH];
    const winningRankResult = this.getWinningRankResult();
    return prize.reduce((winnigMoney, prizeByRank) => {
      winnigMoney += winningRankResult[prizeByRank] * prizeByRank;
      return winnigMoney;
    }, 0);
  }

  #validateMoneyInput(money) {
    Validator.validateNumberType(money);
    Validator.validateExactUnit(money, LOTTO_PRICE);
  }

  #getLottoAmount(money) {
    return money / LOTTO_PRICE;
  }

  #getLottos(lottoAmount) {
    return Array.from({ length: lottoAmount }, () => new Lotto(this.#getLottoNumber()));
  }

  #getLottoNumber() {
    const set = new Set();
    while (set.size < LOTTO_NUMBER.LENGTH) {
      const randomNumber = Math.floor(Math.random() * LOTTO_NUMBER.MAX) + LOTTO_NUMBER.MIN;
      set.add(randomNumber);
    }

    return [...set].sort((a, b) => a - b);
  }

  getLottos() {
    return [...this.#lottos];
  }
}

export default LottoGame;
