import lottoCalculator from './domain/lottoGameCalculator.js';
import lottoGameValidator from './domain/lottoGameValidator.js';
import Lotto from './domain/models/Lotto.js';
import generateRandomNumber from './utils/generateRandomNumber.js';
import Interface from './view/Interface.js';
import outputView from './view/outputView.js';

class LottoGame {
  #lottos;
  #io;

  constructor() {
    this.#lottos = [];
    this.#io = new Interface();
  }

  async play() {
    const purchaseAmount = await this.readPurchaseAmount();
    const buyCount = purchaseAmount / 1000;
    while (this.#lottos.length < buyCount) {
      this.#lottos.push(this.buyLotto());
    }

    outputView.printLottos(this.#lottos.map((lotto) => lotto.getNumbers()));
  }

  buyLotto() {
    const randomNumbers = [];
    while (randomNumbers.length < 6) {
      const randomNumber = generateRandomNumber(1, 45);
      if (!randomNumbers.includes(randomNumber)) randomNumbers.push(randomNumber);
    }

    return new Lotto(randomNumbers.sort((a, b) => a - b));
  }

  async readPurchaseAmount() {
    const pruchaseAmount = await this.#io.read('> 구입금액을 입력해 주세요.');
    try {
      lottoGameValidator.checkPruchaseAmount(pruchaseAmount);
      return Number(pruchaseAmount);
    } catch (error) {
      outputView.printErrorMessage(error);
      return this.readPurchaseAmount();
    }
  }
}

export default LottoGame;
