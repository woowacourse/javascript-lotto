class LottoWebInputView {
  constructor() {
    this.moneyInput = document.querySelector("#money");
    this.purchaseForm = document.querySelector("#purchase-form");
    this.winningInputs = document.querySelectorAll(
      ".winning-input-group .winning-input",
    );
    this.bonusInput = document.querySelector("#bonus-number");
    this.submitButton = document.querySelector("#submit");
    this.closeButton = document.querySelector("#close");
    this.restartButton = document.querySelector("#restart");
  }

  bindPurchase(handler) {
    this.purchaseForm.addEventListener("submit", (event) => {
      event.preventDefault();
      handler();
    });
  }

  bindSubmit(handler) {
    this.submitButton.addEventListener("click", handler);
  }

  bindCloseModal(handler) {
    this.closeButton.addEventListener("click", handler);
  }

  bindRestart(handler) {
    this.restartButton.addEventListener("click", handler);
  }

  reset() {
    this.moneyInput.value = "";
    this.winningInputs.forEach((input) => {
      input.value = "";
    });
    this.bonusInput.value = "";
  }

  getPurchaseMoney() {
    return Number(this.moneyInput.value);
  }

  getWinningNumbers() {
    return [...this.winningInputs].map((input) => input.value).join(",");
  }

  getBonusNumber() {
    return Number(this.bonusInput.value);
  }
}

export default LottoWebInputView;
