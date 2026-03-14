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

    this.restart = {
      $restartBtn: document.querySelector(".restart-btn"),
    }
  }

  bindPurchase(handler){
    this.purchase.$form.addEventListener("submit", (e) => {
      e.preventDefault();
      handler(this.getPurchaseAmount());
    });
  }

  bindSaveResult(handler){
    this.winning.$form.addEventListener("submit", (e) => {
      e.preventDefault();
      handler(this.getWinningNumbers(), this.getBonusNumber());
    });
  }

  getPurchaseAmount() {
    return Number(this.purchase.$input.value);
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

  displayMoreBtn(){
    this.lotto.$displayMoreBtn.addEventListener('click', () => {
      this.lotto.$container.classList.remove('collapsed');
      this.lotto.$displayMoreBtn.classList.add('hidden');
      this.lotto.$hideBtn.classList.remove('hidden');
    });
  }

  hideMoreBtn(){
    this.lotto.$hideBtn.addEventListener('click', () => {
      this.lotto.$container.classList.add('collapsed');
      this.lotto.$displayMoreBtn.classList.remove('hidden');
      this.lotto.$hideBtn.classList.add('hidden');
    });
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

  resetUI() {
    this.modal.$section.classList.add("hidden");
    this.lotto.$section.classList.add("hidden");
    this.winning.$section.classList.add("hidden");
    this.purchase.$form.reset();
    this.winning.$form.reset();
  }

  bindRestart(handler){
    this.restart.$restartBtn.addEventListener("click", () => {
      this.resetUI();
      handler();
    });
  }
}

export default WebView;