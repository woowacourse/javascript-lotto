class WebView {
    constructor() {
        this.$purchaseForm = document.querySelector(".purchase-form");
        this.$purchaseInput = document.querySelector(".purchase-input");

        this.$lottoCount = document.querySelector(".lotto-count");

        this.$purchasedLottoSection = document.querySelector(".purchased-lotto");
        this.$purchasedLottoContainer = document.querySelector(".purchased-lotto-container");

        this.$displayMoreBtn = document.querySelector(".display-more-lottos-btn"); 
        this.$hideBtn = document.querySelector(".hide-lottos-btn");

        this.$winningSection = document.querySelector(".winningnum-bonusnum");
        this.$winningForm = document.querySelector(".winningnum-bonusnum-form");

        this.$modalSection = document.querySelector(".modal-result-screen");
        this.$rankCounts = document.querySelectorAll(".rank-count");

        this.$profitRate = document.querySelector(".profitrate-view");
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
      `).join("");
        this.$purchasedLottoContainer.innerHTML = lottoHTML;
        const lottoItemCount = this.$purchasedLottoContainer.querySelectorAll('.lotto-item').length;

        if (lottoItemCount > 10) {
            this.$displayMoreBtn.classList.remove('hidden');
            this.$purchasedLottoContainer.classList.add('collapsed');
        } else {
            this.$displayMoreBtn.classList.add('hidden');
            this.$hideBtn.classList.add('hidden');
        }
    }

    getWinningNumbers() {
        const $winningInputs = document.querySelectorAll(".winning-number");
        return Array.from($winningInputs).map(input => Number(input.value));
    }

    getBonusNumber() {
        return Number(document.querySelector(".bonus-number").value);
    }

    renderResultTable(rankCount, profitRate) {
        this.$modalSection.classList.remove("hidden");

        this.$rankCounts.forEach(($td) => {
            const rank = $td.dataset.rank;
            $td.innerText = `${rankCount[rank] || 0}개`;
        });

        if (this.$profitRate) {
            this.$profitRate.innerText = `당신의 총 수익률은 ${profitRate}%입니다.`;
        }
    }

    isModalVisible() {
        return !this.$modalSection.classList.contains("hidden");
    }
};

export default WebView;