class LottoUI {
  constructor() {
    this.resultModal = document.querySelector('.dialog');
    this.purchaseBtn = document.querySelector(".purchase-btn");
  }

  updateLottoUI(lottos) {
    this.updateLottoCount(lottos.length);
    this.renderLottoTickets(lottos);
  }

  updateLottoCount(count) {
    document.querySelector(".purchase-count-message span").textContent = count;
  }

  renderLottoTickets(lottos) {
    const lottoList = document.querySelector(".lotto-tickets");

    lottoList.innerHTML = lottos.map((lotto) =>
      `<li>
        <span class="lotto-title">🎟️</span>
        <span class="lotto-body">${lotto.numbers.join(", ")}</span>
      </li>`
    ).join("");
  }

  updatePurchaseUI(isPurchased) {
    const lottoDisplayContainer = document.querySelector(".lotto-display-container");
    const purchaseInput = document.querySelector("#purchase-input");

    if (isPurchased) {
      lottoDisplayContainer.style.display = "block";
      purchaseInput.value = "";
      return;
    }
    lottoDisplayContainer.style.display = "none";
    purchaseInput.value = "";
  }

  disablePurchaseButton() {
    this.purchaseBtn.disabled = true;
  }

  enablePurchaseButton() {
    this.purchaseBtn.disabled = false;
  }

  updateWinningUI(rankHistory, prizeRate) {
    this.updateWinningTable(rankHistory);
    this.updatePrizeRate(prizeRate);
  }

  updateWinningTable(rankHistory) {
    document.querySelectorAll(".dialog-container table tr").forEach((row, index) => {
      if (index > 0) {
        const rank = ["fifth", "fourth", "third", "second", "first"][index - 1];
        row.lastElementChild.textContent = `${rankHistory[rank]}개`;
      }
    });
  }

  updatePrizeRate(prizeRate) {
    document.querySelector(".winning-rate-result p").textContent =
      `당신의 총 수익률은 ${prizeRate.toFixed(1).toLocaleString()}%입니다.`;
  }

  getWinningNumbers() {
    const numberInputs = document.querySelectorAll(".winning-numbers-input .number-input");
    return Array.from(numberInputs)
      .map(input => input.value.trim())
      .filter(value => value !== "");
  }

  getBonusNumber() {
    return document.querySelector("#bonus-input").value.trim();
  }


  showResultModal() {
    this.resultModal.showModal();
  }

  closeResultModal() {
    this.resultModal.close();
  }

  showErrorMessage(message) {
    alert(message);
  }

  resetGameUI() {
    document.querySelector(".lotto-display-container").style.display = "none";
    document.querySelector("#purchase-input").value = "";
    this.resetWinningBonusInput();
    this.updateWinningTable({ first: 0, second: 0, third: 0, fourth: 0, fifth: 0 });
    this.updatePrizeRate(0);
  }

  resetWinningBonusInput() {
    const numberInputs = document.querySelectorAll(".winning-numbers-input .number-input");
    numberInputs.forEach(input => {
      input.value = '';
    });
    document.querySelector("#bonus-input").value = '';
  }
}

export default LottoUI
