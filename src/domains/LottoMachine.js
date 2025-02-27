import { LOTTO, PURCHASE_PRICE } from '../constants/Configurations.js';
import generateRandomNumber from '../utils/generateRandomNumber.js';
import Lotto from './Lotto.js';
import WinningResult from './WinningResult.js';

class LottoMachine {
  #lottos = [];

  constructor(lottoPurchasePrice) {
    const lottoCount = lottoPurchasePrice / PURCHASE_PRICE.UNIT;
    this.#lottos = this.#generateLottos(lottoCount);
  }

  get lottos() {
    return this.#lottos;
  }

  #generateLottos(lottoCount) {
    const generateLotto = () =>
      generateRandomNumber(LOTTO.MAX_NUMBER, LOTTO.LENGTH)().sort(
        (a, b) => a - b,
      );
    return Array.from({ length: lottoCount }, () => new Lotto(generateLotto()));
  }

  calculateResult(winningNumbers, bonusNumber) {
    const winningResult = new WinningResult(winningNumbers, bonusNumber);

    const winningCounts = winningResult.calculate(this.#lottos);
    const profitRate = winningResult.calculateProfitRate(
      this.#lottos.length * PURCHASE_PRICE.UNIT,
      winningCounts,
    );

    return [winningCounts, profitRate];
  }
}

export default LottoMachine;
