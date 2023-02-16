import LottoMachine from '../domain/LottoMachine.js';

class LottoGame {
  #lottos = [];
  #amountOfRank = Array.from({ length: 6 }).fill(0);
  #winningNumbers = { luckyNumbers: [], bonusNumber: 0 };

  constructor(price) {
    this.#lottos = LottoMachine.generateLottos(price);
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
      this.#amountOfRank[lotto.getRank(this.#winningNumbers)] += 1;
    });

    return [...this.#amountOfRank];
  }

  calculateProfit() {}
}

export default LottoGame;
