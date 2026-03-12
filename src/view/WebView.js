class WebView {
  constructor() {
    this.purchase = {
      $form: document.querySelector(".purchase-form"),
      $input: document.querySelector(".purchase-input"),
    };

    this.lotto = {
      $section: document.querySelector(".purchased-lotto"),
      $count: document.querySelector(".lotto-count"),
      $container: document.querySelector(".purchased-lotto-container"),
      $displayMoreBtn: document.querySelector(".display-more-lottos-btn"),
      $hideBtn: document.querySelector(".hide-lottos-btn"),
    };

    this.winning = {
      $section: document.querySelector(".winningnum-bonusnum"),
      $form: document.querySelector(".winningnum-bonusnum-form"),
      $inputs: document.querySelectorAll(".winning-number"), 
      $bonusInput: document.querySelector(".bonus-number"),
    };

    this.modal = {
      $section: document.querySelector(".modal-result-screen"),
      $rankCounts: document.querySelectorAll(".rank-count"),
      $profitRate: document.querySelector(".profitrate-view"),
    };
  }

  getPurchaseAmount() {
    return this.purchase.$input.value;
  }

  renderLottoCount(count) {
    this.lotto.$count.innerText = count;
    this.lotto.$section.classList.remove("hidden");
    this.winning.$section.classList.remove("hidden");
  }

  renderLottosContainer(purchasedLottos) {
    this.lotto.$count.innerText = purchasedLottos.length;

    const lottoHTML = purchasedLottos
      .map((lotto) => `
        <div class="lotto-item">
          <span>🎟️</span>
          <span class="lotto-numbers">${lotto.toString()}</span>
        </div>
      `).join("");

    this.lotto.$container.innerHTML = lottoHTML;

    const isOverTen = purchasedLottos.length > 10;
    this.lotto.$displayMoreBtn.classList.toggle('hidden', !isOverTen);
    this.lotto.$container.classList.toggle('collapsed', isOverTen);
  }

  getWinningNumbers() {
    return Array.from(this.winning.$inputs).map(input => Number(input.value));
  }

  getBonusNumber() {
    return Number(this.winning.$bonusInput.value);
  }

  renderResultTable(rankCount, profitRate) {
    this.modal.$section.classList.remove("hidden");

    this.modal.$rankCounts.forEach(($td) => {
      const rank = $td.dataset.rank;
      $td.innerText = `${rankCount[rank] || 0}개`;
    });

    if (this.modal.$profitRate) {
      this.modal.$profitRate.innerText = `당신의 총 수익률은 ${profitRate}%입니다.`;
    }
  }

  isModalVisible() {
    return !this.modal.$section.classList.contains("hidden");
  }
}

export default WebView;