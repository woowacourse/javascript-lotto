const lottoList = document.querySelector(".lotto-list");
const lottoCount = document.querySelector("#lotto-count");
const moneyError = document.querySelector("#money-error");
const winningBonusError = document.querySelector("#winning-bonus-error");
const modal = document.querySelector(".modal");
const profitText = document.querySelector("#profit");
const fifthCount = document.querySelector("#fifth-count");
const fourthCount = document.querySelector("#fourth-count");
const thirdCount = document.querySelector("#third-count");
const secondCount = document.querySelector("#second-count");
const firstCount = document.querySelector("#first-count");

export const LottoWebOutputView = {
  renderLottoCount(count) {
    lottoCount.textContent = `총 ${count}개를 구매했습니다.`;
  },

  renderLottos(lottos) {
    lottoList.innerHTML = lottos
      .map(
        (lotto) => `
        <li class="text-body">
          <span class="lotto-image">🎟️</span>
          ${lotto.getNumbers().join(", ")}
        </li>
      `,
      )
      .join("");
  },

  showModal() {
    modal.classList.remove("hidden");
  },

  hideModal() {
    modal.classList.add("hidden");
  },

  renderResult(result) {
    fifthCount.textContent = `${result.FIFTH}개`;
    fourthCount.textContent = `${result.FOURTH}개`;
    thirdCount.textContent = `${result.THIRD}개`;
    secondCount.textContent = `${result.SECOND}개`;
    firstCount.textContent = `${result.FIRST}개`;
  },

  renderProfit(profit) {
    profitText.textContent = `총 수익률은 ${profit}%입니다.`;
  },

  showMoneyError(message) {
    moneyError.textContent = message;
    moneyError.classList.remove("hidden");
  },

  clearMoneyError() {
    moneyError.textContent = "";
    moneyError.classList.add("hidden");
  },

  showWinningBonusError(message) {
    winningBonusError.textContent = message;
    winningBonusError.classList.remove("hidden");
  },

  clearWinningBonusError() {
    winningBonusError.textContent = "";
    winningBonusError.classList.add("hidden");
  },
};
