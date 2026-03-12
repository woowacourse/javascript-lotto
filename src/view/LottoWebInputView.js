const purchaseButton = document.querySelector("#purchase");
const moneyInput = document.querySelector("#money");

export const LottoWebInputView = {
  bindPurchase(handler) {
    purchaseButton.addEventListener("click", handler);
  },

  getPurchaseMoney() {
    return moneyInput.value;
  },
};
