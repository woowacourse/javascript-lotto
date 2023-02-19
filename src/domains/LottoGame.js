import lottoMachine from './lottoMachine.js';
import LOTTO from '../constants/lotto.js';
import LOTTO_GAME from '../constants/lottoGame.js';
import RANK from '../constants/rank.js';
import numberHandler from '../utils/numberHandler.js';

class LottoGame {
  #lottos = [];
  #amountOfRanks = Array.from({ length: RANK.SIZE }).fill(0);
  #winningNumbers = { luckyNumbers: [], bonusNumber: 0 };

  constructor(price) {
    this.#lottos = lottoMachine.generateLottos(price);
  }

  getLottoNumbersList() {
    return this.#lottos.map(lotto => lotto.getNumbers());
  }

  initWinningNumbers(luckyNumbers, bonusNumber) {
    this.#winningNumbers.luckyNumbers = luckyNumbers;
    this.#winningNumbers.bonusNumber = bonusNumber;
  }

  getAmountOfRanks() {
    this.#lottos.forEach(lotto => {
      this.#amountOfRanks[lotto.getRank(this.#winningNumbers)] += 1;
    });

    return [...this.#amountOfRanks];
  }

  calculateTotalPrizeMoney() {
    return LOTTO_GAME.PRIZE_MONEY.reduce(
      (acc, cur, idx) => acc + cur * this.#amountOfRanks[idx],
      0
    );
  }

  calculateProfit() {
    const totalPrizeMoney = this.calculateTotalPrizeMoney();
    const totalBuyMoney = this.#lottos.length * LOTTO.PRICE;

    return numberHandler.roundOffNumber((totalPrizeMoney / totalBuyMoney) * 100);
  }

  isRetry(retryCommand) {
    return retryCommand === LOTTO_GAME.RETRY;
  }
}

export default LottoGame;
