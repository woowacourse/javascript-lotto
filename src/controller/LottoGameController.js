const Lottos = require('../domain/model/Lottos');
const WinningLotto = require('../domain/model/WinningLotto');
const exception = require('../utils/exception');
const inputView = require('../view/inputView');
const outputView = require('../view/outputView');
const { PRICE_UNIT } = require('../constants/constants');

class LottoGameController {
  #lottos;

  #winningLotto;

  constructor() {
    inputView.setPurchasePriceInputHandler(this.handlePurchasePriceInput);
    inputView.setWinningNumbersInputHandler(this.handleWinningNumbersInput);
    inputView.setCloseModalHandler(LottoGameController.handleCloseModal);
    inputView.setRestartHandler(LottoGameController.handleRestart);
  }

  handlePurchasePriceInput = (input) => {
    try {
      const lottoCount = LottoGameController.calculateLottoCount(input);

      this.#lottos = new Lottos(lottoCount);

      this.showPurchasedLottos();
    } catch (error) {
      alert(error.message);
    }
  };

  handleWinningNumbersInput = (winningNumbers, bonusNumber) => {
    try {
      this.#winningLotto = new WinningLotto(winningNumbers, bonusNumber);
      this.#lottos.calculateAllRanks(
        this.#winningLotto.getWinningNumbers(),
        this.#winningLotto.getBonusNumber()
      );
      this.showResult();
    } catch (error) {
      alert(error.message);
    }
  };

  showPurchasedLottos() {
    outputView.renderPurchasedLottos(this.#lottos.getLottos());
    outputView.renderWinningNumbersInput();
  }

  showResult() {
    outputView.renderStatistics(
      [...this.#lottos.getAllRanks()].reverse(),
      this.#lottos.getProfitRate()
    );
  }

  static handleCloseModal = () => {
    outputView.closeModal();
  };

  static handleRestart = () => {
    outputView.restart();
  };

  static calculateLottoCount(priceInput) {
    exception.checkPurchasePrice(priceInput);

    const price = Number(priceInput);

    return Math.floor(price / PRICE_UNIT);
  }
}

module.exports = LottoGameController;
