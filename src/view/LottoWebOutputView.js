const lottoList = document.querySelector(".lotto-list");
const lottoCount = document.querySelector("#lotto-count");
const moneyError = document.querySelector("#money-error");
const winningBonusError = document.querySelector("#winning-bonus-error");

export const LottoWebOutputView = {
  renderLottoCount(count) {
    lottoCount.innerText = `총 ${count}개를 구매했습니다.`;
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
