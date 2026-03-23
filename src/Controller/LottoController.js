import Validator from "../Utils/Validator.js";
import LottoMachine from "../Domain/LottoMachine.js";
import OutputView from "../View/OutputView.js";
import LottoResultCalculator from "../Domain/LottoResultCalculator.js";
import InputView from "../View/InputView.js";

class LottoController {
  #lottos = [];
  #purchasePrice = 0;

  async run() {
    this.#bindEvents();
  }

  #bindEvents() {
    const purchaseButton = document.querySelector("#purchaseButton");
    const resultButton = document.querySelector("#result-button");
    const restartButton = document.querySelector("#restart-button");
    const closeButton = document.querySelector("#close-button");

    purchaseButton.addEventListener("click", () => this.#handlePurchase());
    resultButton.addEventListener("click", () => this.#handleShowResult());
    restartButton.addEventListener("click", () => this.#handleRestart());
    closeButton.addEventListener("click", () => this.#handleCloseModal());
  }

  #handlePurchase() {
    try {
      const priceInput = InputView.getPurchasePrice();
      this.#purchasePrice = Validator.validatePurchasePrice(priceInput);

      const lottoMachine = new LottoMachine();
      this.#lottos = lottoMachine.issueLottos(this.#purchasePrice);

      OutputView.printLottoList(this.#lottos);
      OutputView.showWinningSection();
    } catch (e) {
      OutputView.showAlert(e.message);
      InputView.clearPurchasePrice();
      InputView.focusPurchasePrice();
    }
  }

  #handleShowResult() {
    try {
      const winningNumbers = Validator.validateWinningNumbers(
        InputView.getWinningNumbers(),
      );
      const bonusNumber = Validator.validateBonusNumber(
        InputView.getBonusNumber(),
        winningNumbers,
      );

      const luckyNumbers = { winningNumbers, bonusNumber };
      const resultCalculator = new LottoResultCalculator();
      const winningResult = resultCalculator.calculateWinningRank(
        this.#lottos,
        luckyNumbers,
      );

      OutputView.printMatchResult(winningResult);
      const profitRate = resultCalculator.calculateProfitRate(
        winningResult,
        this.#purchasePrice,
      );
      OutputView.printProfitRate(profitRate);
      OutputView.showModal();
    } catch (e) {
      OutputView.showAlert(e.message);
      InputView.clearWinningNumbers();
      InputView.focusFirstWinningNumber();
    }
  }

  #handleRestart() {
    window.location.reload();
  }

  #handleCloseModal() {
    OutputView.hideModal();
  }
}

export default LottoController;
