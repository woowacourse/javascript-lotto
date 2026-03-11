class WebView {
  constructor() {
    this.$purchaseForm = document.querySelector(".purchase-form");
    this.$purchaseInput = document.querySelector(".purchase-input");
    this.$lottoCount = document.querySelector(".lotto-count");
    this.$purchasedLottoSection = document.querySelector(".purchased-lotto");
  }

  getPurchaseAmount() {
    return this.$purchaseInput.value;
  }

  renderLottoCount(count) {
    this.$lottoCount.innerText = count;
    this.$purchasedLottoSection.classList.remove("hidden");
  }
}

export default WebView;