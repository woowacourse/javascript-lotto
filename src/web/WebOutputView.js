import {
  showLottoSection,
  showWinningSection,
  disablePurchaseForm,
  showModalOverlay,
} from "./DOMController.js";

class WebOutputView {
  static printLottos(lottoList) {
    const lottoCountContainer = document.querySelector("span.lotto-count");
    lottoCountContainer.textContent = lottoList.length;

    const lottoListContainer = document.querySelector("ul.lotto-list");
    lottoListContainer.innerHTML = lottoList
      .map((lotto) => `<li>${lotto.join(", ")}</li>`)
      .join("");

    showLottoSection(true);
    showWinningSection(true);
    disablePurchaseForm(true);
  }

  static printStatistics({ statistics, profitRate }) {
    showModalOverlay(true);

    const statisticsTableBody = document.querySelector(
      ".modal-result-table tbody",
    );
    statisticsTableBody.innerHTML = statistics
      .map((stat) => `<tr>${this.#formatPrizeDetail(stat)}</tr>`)
      .join("");

    const profitTextSpan = document.querySelector(".modal-profit-value");
    profitTextSpan.textContent = profitRate;
  }

  static printError(error) {
    alert(error.message);
  }

  static #formatPrizeDetail(prizeDetail) {
    const { matchCount, hasBonus, count, prize } = prizeDetail;
    const formatPrize = prize.toLocaleString();

    if (hasBonus) {
      return `<td>${matchCount}개+보너스볼</td><td>${formatPrize}</td><td>${count}개</td>`;
    }
    return `<td>${matchCount}개</td><td>${formatPrize}</td><td>${count}개</td>`;
  }
}

export default WebOutputView;
