import LottoMachine from '../domain/LottoMachine.js';

class LottoGame {
  #price = 0;
  #lottos = [];
  #amountOfRank = [];
  #winningNumbers = { luckyNumbers: [], bonusNumber: 0 };

  constructor(price) {
    this.#price = price;
    this.#lottos = LottoMachine.generateLottos(price);
  }

  getLottoNumbersList() {
    return this.#lottos.map(lotto => lotto.getNumbers());
  }
}

export default LottoGame;
