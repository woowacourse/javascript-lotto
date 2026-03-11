class WebView {
    constructor() {
        this.$purchaseForm = document.querySelector(".purchase-form");
        this.$purchaseInput = document.querySelector(".purchase-input");

        this.$lottoCount = document.querySelector(".lotto-count");

        this.$purchasedLottoSection = document.querySelector(".purchased-lotto");
        this.$purchasedLottoContainer = document.querySelector(".purchased-lotto-container");
    }

    getPurchaseAmount() {
        return this.$purchaseInput.value;
    }

    renderLottoCount(count) {
        this.$lottoCount.innerText = count;
        this.$purchasedLottoSection.classList.remove("hidden");
    }

    renderLottosContainer(purchasedLottos) {
        this.$lottoCount.innerText = purchasedLottos.length;
        this.$purchasedLottoSection.classList.remove("hidden");

        const lottoHTML = purchasedLottos
      .map((lotto) => `
        <div class="lotto-item">
          <span>🎟️</span>
          <span class="lotto-numbers">${lotto.toString()}</span>
        </div>
      `)
      .join(""); 



        this.$purchasedLottoContainer.innerHTML = lottoHTML;
    }
}

export default WebView;