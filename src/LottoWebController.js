import validatePurchaseAmount from "./domain/validation/validatePurchaseAmount.js";
import LottoMachine from "./domain/LottoMachine.js";
import validateWinningNumbers from "./domain/validation/validateWinningNumbers.js";
import validateBonusNumber from "./domain/validation/validateBonusNumber.js";
import generateAnswerLotto from "./domain/AnswerLottoPack.js";
import profitCalculator from "./domain/profitCalculator.js";

class LottoWebController {
  constructor(view) {
    this.view = view;
  }

  start() {
    this.view.purchaseButton.addEventListener("click", () => this.handlePurchase());
    this.view.purchaseInput.addEventListener("keyup", (event) => this.handleEnterKey(event));
    this.view.resultButton.addEventListener("click", () => this.handleWinningResult());
    this.view.restartButton.addEventListener("click", () => this.restart());
    this.view.closeButton.addEventListener("click", () => this.view.closeModal());
  }

  handlePurchase() {
    try {
      const purchaseAmount = document.querySelector(".purchase_input").value;
      validatePurchaseAmount(purchaseAmount);
      const { count, lottoPack } = LottoMachine(purchaseAmount);

      this.purchaseAmount = purchaseAmount;
      this.lottoPack = lottoPack;

      this.view.updatePurchaseUI(count);
      this.view.updateRandomLottoUI(lottoPack);
      this.view.showResultSections();

      return { purchaseAmount, lottoPack };
    } catch (error) {
      this.view.showError(error.message);
    }
  }

  handleWinningResult = () => {
    try {
      const { winningNumbers, bonusNumberInput } = this.validateInputs();
      this.view.showModal();
      const answerLotto = generateAnswerLotto(winningNumbers, bonusNumberInput);
      const winningResult = this.lottoPack.playCompare(answerLotto);
      const profitRate = profitCalculator(this.purchaseAmount, winningResult);
      this.view.updateResultUI(winningResult);
      this.view.updateProfitUI(profitRate);
    } catch (error) {
      this.view.resetInputs(error.message);
      window.alert(error.message);
    }
  };

  validateInputs = () => {
    const winningNumberInputs = document.querySelectorAll(".winning_number_input");
    const winningNumbers = [...winningNumberInputs].map((winningNumber) => {
      return Number(winningNumber.value);
    });
    validateWinningNumbers(winningNumbers.join(","));
    const bonusNumberInput = Number(document.querySelector(".bonus_number_input").value);
    validateBonusNumber(winningNumbers)(bonusNumberInput);
    return { winningNumbers, bonusNumberInput };
  };

  handleEnterKey(event) {
    if (event.key === "Enter") {
      this.handlePurchase();
    }
  }

  handleWinningResult(purchaseAmount, lottoPack) {
    winningResult(purchaseAmount, lottoPack);
  }

  restart() {
    this.view.resetAll();
  }
}

export default LottoWebController;
