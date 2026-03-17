class LottoWebOutputView {
  constructor() {
    this.lottoList = document.querySelector(".lotto-list");
    this.lottoCount = document.querySelector("#lotto-count");
    this.moneyError = document.querySelector("#money-error");
    this.winningBonusError = document.querySelector("#winning-bonus-error");
    this.modal = document.querySelector(".modal");
    this.profitText = document.querySelector("#profit");
    this.fifthCount = document.querySelector("#fifth-count");
    this.fourthCount = document.querySelector("#fourth-count");
    this.thirdCount = document.querySelector("#third-count");
    this.secondCount = document.querySelector("#second-count");
    this.firstCount = document.querySelector("#first-count");
    this.lottoSection = document.querySelector(".lotto-section");
    this.winningInputSection = document.querySelector(
      ".winning-bonus-input-section",
    );
    this.submitButton = document.querySelector("#submit");
  }

  renderLottoCount(count) {
    this.lottoCount.textContent = `총 ${count}개를 구매했습니다.`;
  }

  renderLottos(lottos) {
    this.lottoList.innerHTML = "";

    lottos.forEach((lotto) => {
      const li = document.createElement("li");
      li.className = "text-body";

      const span = document.createElement("span");
      span.className = "lotto-image";
      span.textContent = "🎟️";

      li.append(span, ` ${lotto.getNumbers().join(", ")}`);
      this.lottoList.append(li);
    });
  }

  showModal() {
    this.modal.classList.remove("hidden");
  }

  hideModal() {
    this.modal.classList.add("hidden");
  }

  renderResult(result) {
    this.fifthCount.textContent = `${result.FIFTH}개`;
    this.fourthCount.textContent = `${result.FOURTH}개`;
    this.thirdCount.textContent = `${result.THIRD}개`;
    this.secondCount.textContent = `${result.SECOND}개`;
    this.firstCount.textContent = `${result.FIRST}개`;
  }

  renderProfit(profit) {
    this.profitText.textContent = `총 수익률은 ${profit}%입니다.`;
  }

  showMoneyError(message) {
    this.moneyError.textContent = message;
    this.moneyError.classList.remove("hidden");
  }

  clearMoneyError() {
    this.moneyError.textContent = "";
    this.moneyError.classList.add("hidden");
  }

  showWinningBonusError(message) {
    this.winningBonusError.textContent = message;
    this.winningBonusError.classList.remove("hidden");
  }

  clearWinningBonusError() {
    this.winningBonusError.textContent = "";
    this.winningBonusError.classList.add("hidden");
  }

  showPurchaseSection() {
    this.lottoSection.classList.remove("hidden");
    this.winningInputSection.classList.remove("hidden");
    this.submitButton.classList.remove("hidden");
  }

  hidePurchaseSection() {
    this.lottoSection.classList.add("hidden");
    this.winningInputSection.classList.add("hidden");
    this.submitButton.classList.add("hidden");
  }
}

export default LottoWebOutputView;
