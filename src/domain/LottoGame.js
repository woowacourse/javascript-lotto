import LottoMachine from '../domain/LottoMachine.js';

class LottoGame {
  #price = 0;
  #lottos = [];
  #amountOfRank = [];

  constructor(price) {
    this.#price = price;
    this.#lottos = LottoMachine.generateLottos(price);
  }
}

export default LottoGame;
