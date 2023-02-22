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
    this.#lottos = [];
    InputView.setBudgetInputHandler(this.purchaseLottos);
    InputView.setWinningNumberInputHandler(this.inputWinningLotto);
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

  showResult = () => {
    OutputView.showResult();
  };
}

export default WebLottoSimulator;
