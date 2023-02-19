import LottoMachine from './LottoMachine.js';
import NumberHandler from '../util/NumberHandler.js';
import LOTTO from '../constant/lotto.js';
import { RANK, RANKING_TABLE } from '../constant/rank.js';

class LottoGame {
  #lottos = [];
  #amountOfRanks = Array.from({ length: 6 }, () => 0);
  #winningNumbers = { luckyNumbers: [], bonusNumber: 0 };

  constructor(price) {
    this.#lottos = LottoMachine.generateLottos(price);
  }

  getLottos() {
    return this.#lottos.map(lotto => lotto.getNumbers());
  }

  initWinningNumbers({ luckyNumbers, bonusNumber }) {
    this.#winningNumbers = { luckyNumbers, bonusNumber };
  }

  drawLotto() {
    this.#lottos.forEach(lotto => {
      this.#amountOfRanks[
        this.#getRank(lotto.getNumbers(), this.#winningNumbers)
      ] += 1;
    });

    return [...this.#amountOfRanks];
  }

  #getRank(numbers, { luckyNumbers, bonusNumber }) {
    const matchCount = this.#getMatchCount(numbers, luckyNumbers);
    const isSecondRank =
      matchCount === 5 && this.#hasBonusNumber(numbers, bonusNumber);

    return isSecondRank ? RANK.SECOND : RANKING_TABLE[matchCount];
  }

  #getMatchCount(numbers, targetNumbers) {
    return numbers.filter(number => targetNumbers.includes(number)).length;
  }

  #hasBonusNumber(numbers, bonusNumber) {
    return numbers.includes(bonusNumber);
  }

  calculateProfit() {
    const totalPrizeMoney = this.#calculateTotalPrizeMoney();
    const totalBuyMoney = this.#lottos.length * LOTTO.PRICE;

    return NumberHandler.roundOff((totalPrizeMoney / totalBuyMoney) * 100);
  }

  #calculateTotalPrizeMoney() {
    return LOTTO.PRIZE_MONEY.reduce((acc, curr, currIdx) => {
      return acc + curr * this.#amountOfRanks[currIdx];
    }, 0);
  }
}

export default LottoGame;
