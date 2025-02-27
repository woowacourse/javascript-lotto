<<<<<<< HEAD
import { LOTTO, PURCHASE_PRICE } from '../constants/Configurations.js';
import generateRandomNumber from '../utils/generateRandomNumber.js';
import Lotto from './Lotto.js';
import WinningResult from './WinningResult.js';
=======
import { LOTTO } from '../constants/CONFIGURATIONS.js';
import generateRandomNumber from '../utils/generateRandomNumber.js';
import Lotto from './Lotto.js';
>>>>>>> 0f9ff21ed0cd6104c06a2b5d22feb4bc389fa693

class LottoMachine {
  #lottos = [];

<<<<<<< HEAD
  constructor(lottoPurchasePrice) {
    const lottoCount = lottoPurchasePrice / PURCHASE_PRICE.UNIT;
    this.#lottos = this.#generateLottos(lottoCount);
  }

  get lottos() {
    return this.#lottos;
  }

=======
  constructor(lottoCount) {
    this.#lottos = this.#generateLottos(lottoCount);
  }

>>>>>>> 0f9ff21ed0cd6104c06a2b5d22feb4bc389fa693
  #generateLottos(lottoCount) {
    const generateLotto = () =>
      generateRandomNumber(LOTTO.MAX_NUMBER, LOTTO.LENGTH)().sort(
        (a, b) => a - b,
      );
    return Array.from({ length: lottoCount }, () => new Lotto(generateLotto()));
  }

<<<<<<< HEAD
  calculateResult(winningNumbers, bonusNumber) {
    const winningResult = new WinningResult(winningNumbers, bonusNumber);

    const winningCounts = winningResult.calculate(this.#lottos);
    const profitRate = winningResult.calculateProfitRate(
      this.#lottos.length * PURCHASE_PRICE.UNIT,
      winningCounts,
    );

    return [winningCounts, profitRate];
=======
  get lottos() {
    return this.#lottos;
>>>>>>> 0f9ff21ed0cd6104c06a2b5d22feb4bc389fa693
  }
}

export default LottoMachine;
