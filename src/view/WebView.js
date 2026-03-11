class WebView {
    constructor() {
        this.$purchaseForm = document.querySelector(".purchase-form");
        this.$purchaseInput = document.querySelector(".purchase-input");

        this.$lottoCount = document.querySelector(".lotto-count");

        this.$purchasedLottoSection = document.querySelector(".purchased-lotto");
        this.$purchasedLottoContainer = document.querySelector(".purchased-lotto-container");

        this.$winningSection = document.querySelector(".winningnum-bonusnum");
        this.$winningForm = document.querySelector(".winningnum-bonusnum-form");
    }

    getPurchaseAmount() {
        return this.$purchaseInput.value;
    }

    renderLottoCount(count) {
        this.$lottoCount.innerText = count;
        this.$purchasedLottoSection.classList.remove("hidden");
        this.$winningSection.classList.remove("hidden");
    }

    renderLottosContainer(purchasedLottos) {
        this.$lottoCount.innerText = purchasedLottos.length;
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

    getWinningNumbers() {
        const $winningInputs = document.querySelectorAll(".winning-number");
        return Array.from($winningInputs).map(input => Number(input.value));
    }

    getBonusNumber() {
        return Number(document.querySelector(".bonus-number").value);
    }

    
}

export default WebView;