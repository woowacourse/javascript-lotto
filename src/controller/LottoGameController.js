import Lottos from '../domain/model/Lottos';
import WinningLotto from '../domain/model/WinningLotto';
import view from '../view/view';

export default class LottoGameController {
  #lottos;

  #winningLotto;

  handlePurchasePriceInput(input) {
    try {
      this.#lottos = new Lottos(input);

      this.#showPurchasedLottos();
    } catch (error) {
      alert(error.message);
    }
  }

  handleWinningNumbersInput(winningNumbers, bonusNumber) {
    try {
      this.#winningLotto = new WinningLotto(winningNumbers, bonusNumber);

      this.#lottos.createRanks(
        this.#winningLotto.getWinningNumbers(),
        this.#winningLotto.getBonusNumber()
      );

      this.#showResult();
    } catch (error) {
      alert(error.message);
    }
  }

  #showPurchasedLottos() {
    view.renderPurchasedLottos(this.#lottos.getLottos());
    view.renderWinningNumbersInput();
  }

  #showResult() {
    view.renderStatistics(
      this.#lottos.getAllRanks(),
      this.#lottos.getProfitRate()
    );
  }

  static handleCloseModal = () => {
    view.closeModal();
  };

  static handleRestart = () => {
    view.restart();
  };
}
