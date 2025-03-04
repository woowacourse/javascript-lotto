import WinningResult from '../domains/WinningResult.js';
import { PURCHASE_PRICE } from '../constants/CONFIGURATIONS.js';
import InputView from '../views/web/InputView.js';
import LottoMachine from '../domains/LottoMachine.js';
import OutputView from '../views/web/OutputView.js';

class LottoService {
  #lottos;

  constructor() {
    this.#lottos = [];
  }

  handlePurchase() {
    try {
      const lottoCount = InputView.enterPurchasePrice();
      const lottoMachine = new LottoMachine(lottoCount);
      this.#lottos = lottoMachine.lottos;

      OutputView.printPurchaseLottos(lottoCount, lottoMachine.lottos);
    } catch (error) {
      alert(error.message);
      InputView.resetPurchaseInput();
    }
  }

  handleLottoResult() {
    try {
      const { winningNumbers, bonusNumber } = InputView.enterWinningAndBonusNumber();
      const { winningCounts, profitRate } = this.getWinningResult({
        lottos: this.#lottos,
        winningNumbers,
        bonusNumber,
      });

      OutputView.showModal(winningCounts, profitRate);
    } catch (error) {
      alert(error.message);
    }
  }

  getWinningResult({ lottos, winningNumbers, bonusNumber }) {
    const winningResult = new WinningResult(winningNumbers, bonusNumber);
    const winningCounts = winningResult.calculate(lottos);
    const profitRate = winningResult.calculateProfitRate(
      lottos.length * PURCHASE_PRICE.UNIT,
      winningCounts,
    );

    return { winningCounts, profitRate };
  }

  resetLotto() {
    this.#lottos = [];
  }
}

export default LottoService;
