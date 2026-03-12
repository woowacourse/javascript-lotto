const purchaseButton = document.querySelector("#purchase");
const moneyInput = document.querySelector("#money");
const purchaseForm = document.querySelector("#purchase-form");
const winningInputs = document.querySelectorAll(
  ".winning-input-group .winning-input",
);
const bonusInput = document.querySelector("#bonus-number");
const submitButton = document.querySelector("#submit");
const closeButton = document.querySelector("#close");

export const LottoWebInputView = {
  bindPurchase(handler) {
    purchaseButton.addEventListener("click", handler);

    purchaseForm.addEventListener("submit", (event) => {
      event.preventDefault();
      handler();
    });
  },

  bindSubmit(handler) {
    submitButton.addEventListener("click", handler);
  },

  bindCloseModal(handler) {
    closeButton.addEventListener("click", handler);
  },

  getPurchaseMoney() {
    return moneyInput.value;
  },

  getWinningNumbers() {
    return [...winningInputs].map((input) => input.value).join(",");
  },

  getBonusNumber() {
    return Number(bonusInput.value);
  },
};
