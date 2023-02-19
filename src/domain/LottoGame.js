import LottoMachine from '../domain/LottoMachine.js';
import LOTTO from '../constant/lotto.js';
import NumberHandler from '../util/numberHandler.js';

class LottoGame {
  #lottos = [];
  #amountOfRanks = Array.from({ length: 6 }).fill(0);
  #winningNumbers = { luckyNumbers: [], bonusNumber: 0 };

  constructor(price) {
    this.#lottos = LottoMachine.generateLottos(price);
  }

  getLottos() {
    return this.#lottos.map(lotto => lotto.getNumbers());
  }

  initWinningNumbers(luckyNumbers, bonusNumber) {
    this.#winningNumbers.luckyNumbers = luckyNumbers;
    this.#winningNumbers.bonusNumber = bonusNumber;
  }

  drawLotto() {
    this.#lottos.forEach(lotto => {
      this.#amountOfRanks[lotto.getRank(this.#winningNumbers)] += 1;
    });

    return [...this.#amountOfRanks];
  }

  calculateTotalPrizeMoney() {
    return LOTTO.PRIZE_MONEY.reduce((acc, curr, currIdx) => {
      return acc + curr * this.#amountOfRanks[currIdx];
    }, 0);
  }

  calculateProfit() {
    const totalPrizeMoney = this.calculateTotalPrizeMoney();
    const totalBuyMoney = this.#lottos.length * LOTTO.PRICE;

    return NumberHandler.roundOff((totalPrizeMoney / totalBuyMoney) * 100);
  }
}

export default LottoGame;
