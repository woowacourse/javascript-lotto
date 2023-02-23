import { LOTTO_CONSTANT, LOTTO_RANKING, PRINT_MESSAGE } from '../data/constants.js';
import LottoUtils from '../domain/LottoUtils.js';
import Lotto from '../domain/Lotto.js';
import WinningLotto from '../domain/WinningLotto.js';
import InputView from '../view/web/InputView.js';
import OutputView from '../view/web/OutputView.js';

class WebLottoSimulator {
  #lottos;
  #winningLotto;

  constructor() {
    InputView.setBudgetInputHandler(this.purchaseLottos);
    InputView.setWinningNumberInputHandler(this.inputWinningLotto);
    InputView.setModalCloseButtonHandler(this.closeResult);
  }

  purchaseLottos = (budget) => {
    try {
      LottoUtils.validateBudget(+budget);
      this.#lottos = Array.from({ length: budget / LOTTO_CONSTANT.PRICE }).map(
        () => new Lotto(LottoUtils.createLottoNumbers())
      );

      this.showPurchasedLottos();
    } catch (err) {
      alert(err);
    }
  };

  showPurchasedLottos = () => {
    OutputView.showLottoList(this.#lottos);
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

  calculateWinningResult() {
    const winningResult = {};

    Object.values(LOTTO_RANKING).forEach((rank) => (winningResult[rank] = 0));
    this.#lottos.forEach((lotto) => {
      const rank = this.#winningLotto.calculateRanking(lotto);
      if (rank in winningResult) winningResult[rank] += 1;
    });
    return winningResult;
  }

  showResult = () => {
    const winningResult = this.calculateWinningResult();
    OutputView.showResult(
      winningResult,
      LottoUtils.calculateYieldRate(winningResult, this.#lottos.length)
    );
  };

  closeResult = () => {
    OutputView.closeResult();
  };
}

export default WebLottoSimulator;
