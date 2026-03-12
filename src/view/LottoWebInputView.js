const purchaseButton = document.querySelector("#purchase");
const moneyInput = document.querySelector("#money");
const purchaseForm = document.querySelector("#purchase-form");

export const LottoWebInputView = {
  bindPurchase(handler) {
    purchaseButton.addEventListener("click", handler);

    purchaseForm.addEventListener("submit", (event) => {
      event.preventDefault();
      handler();
    });
  },

  getPurchaseMoney() {
    return moneyInput.value;
  },
};
