import lottoMachine from './lottoMachine.js';
import LOTTO from '../constants/lotto.js';
import LOTTO_GAME from '../constants/lottoGame.js';
import numberHandler from '../utils/numberHandler.js';

class LottoGame {
  #lottos = [];
  #amountOfRanks = Array.from({ length: 6 }).fill(0);
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

  execute() {
    this.#lottos.forEach(lotto => {
      this.#amountOfRanks[lotto.getRank(this.#winningNumbers)] += 1;
    });

    return [...this.#amountOfRanks];
  }

  calculateTotalPrizeMoney() {
    return LOTTO.PRIZE_MONEY.reduce((acc, curr, idx) => acc + curr * this.#amountOfRanks[idx], 0);
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
