import { LOTTO_CONSTANT, LOTTO_RANKING } from '../data/constants.js';
import LottoUtils from '../domain/LottoUtils.js';
import Lotto from '../domain/Lotto.js';
import WinningLotto from '../domain/WinningLotto.js';
import PurchaseForm from '../view/web/PurchaseForm.js';
import LottoListView from '../view/web/LottoListView.js';
import ResultView from '../view/web/ResultView.js';

class WebLottoSimulator {
  #lottos;
  #winningLotto;

  constructor() {
    PurchaseForm.setBudgetInputHandler(this.purchaseLottos);
    PurchaseForm.setWinningNumberInputHandler(this.inputWinningLotto);
    PurchaseForm.setModalCloseHandler(this.closeResult);
    PurchaseForm.setRetryButtonHandler(this.retry);
  }

  purchaseLottos = (budget) => {
    try {
      LottoUtils.validateBudget(budget);
      this.#lottos = Array.from({ length: budget / LOTTO_CONSTANT.PRICE }).map(
        () => new Lotto(LottoUtils.createLottoNumbers())
      );

      this.showPurchasedLottos();
    } catch (err) {
      alert(err);
    }
  };

  showPurchasedLottos = () => {
    LottoListView.render(this.#lottos);
    LottoListView.show();
  };

  inputWinningLotto = (winningNumbers) => {
    try {
      this.#winningLotto = new WinningLotto(
        winningNumbers.slice(0, LOTTO_CONSTANT.LENGTH),
        winningNumbers[LOTTO_CONSTANT.LENGTH]
      );
      this.showResult();
    } catch (err) {
      alert(err);
    }
  };

  calculateWinningResult = () => {
    const winningResult = {};

    Object.values(LOTTO_RANKING).forEach((rank) => (winningResult[rank] = 0));
    this.#lottos.forEach((lotto) => {
      const rank = this.#winningLotto.calculateRanking(lotto);
      if (rank in winningResult) winningResult[rank] += 1;
    });
    return winningResult;
  };

  showResult = () => {
    const winningResult = this.calculateWinningResult();
    ResultView.render(
      winningResult,
      LottoUtils.calculateYieldRate(winningResult, this.#lottos.length)
    );
    ResultView.show();
  };

  closeResult = () => {
    ResultView.hide();
  };

  retry = () => {
    ResultView.hide();
    LottoListView.hide();
    LottoListView.reset();
  };
}

export default WebLottoSimulator;
