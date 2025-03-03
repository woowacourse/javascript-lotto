import { prepareCompare } from "./web/prepareCompare/prepareCompare.js";
import { winningResult } from "./web/winningResult/winningResult.js";

class LottoWebController {
  constructor(view) {
    this.view = view;
  }

  start() {
    this.view.purchaseButton.addEventListener("click", () => this.handlePurchase());
    this.view.purchaseInput.addEventListener("keyup", (event) => this.handleEnterKey(event));
  }

  handlePurchase() {
    const { purchaseAmount, lottoPack } = prepareCompare();

    if (purchaseAmount && lottoPack) {
      this.view.resultButton.removeEventListener("click", this.handleWinningResult);
      this.view.restartButton.removeEventListener("click", this.restart);
      this.view.closeButton.removeEventListener("click", this.closeModal);

      this.view.resultButton.addEventListener("click", () => this.handleWinningResult(purchaseAmount, lottoPack));
      this.view.restartButton.addEventListener("click", () => this.restart());
      this.view.closeButton.addEventListener("click", () => this.closeModal());
    }
  }

  handleEnterKey(event) {
    if (event.key === "Enter") {
      this.handlePurchase();
    }
  }

  handleWinningResult(purchaseAmount, lottoPack) {
    winningResult(purchaseAmount, lottoPack);
  }

  closeModal() {
    this.view.closeModal();
  }

  restart() {
    this.view.resetInputs();
  }
}

export default LottoWebController;
