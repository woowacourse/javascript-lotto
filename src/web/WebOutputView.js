import {
  showLottoSection,
  showWinningSection,
  disablePurchaseForm,
  disableWinningForm,
  showModalOverlay,
} from "./DOMController.js";

class WebOutputView {
  static printLottos(lottoList) {
    this.#updateLottoCount(lottoList);
    this.#renderLottoList(lottoList);
    this.#showLottoResult();
  }

  static printStatistics({ statistics, profitRate }) {
    this.#showStatisticsModal();
    this.#renderStatistics(statistics);
    this.#updateProfitRate(profitRate);
  }

  static printError(error) {
    alert(error.message);
  }

  static #updateLottoCount(lottoList) {
    const lottoCountContainer = document.querySelector("span.lotto-count");
    lottoCountContainer.textContent = lottoList.length;
  }

  static #renderLottoList(lottoList) {
    const lottoListContainer = document.querySelector("ul.lotto-list");
    lottoListContainer.replaceChildren(this.#createLottoItems(lottoList));
  }

  static #createLottoItems(lottoList) {
    const lottoFragment = document.createDocumentFragment();
    lottoList.forEach((lotto) =>
      lottoFragment.appendChild(this.#createLottoItem(lotto)),
    );
    return lottoFragment;
  }

  static #createLottoItem(lotto) {
    const li = document.createElement("li");
    li.textContent = lotto.join(", ");
    return li;
  }

  static #showLottoResult() {
    showLottoSection(true);
    showWinningSection(true);
    disablePurchaseForm(true);
  }

  static #showStatisticsModal() {
    disableWinningForm(true);
    showModalOverlay(true);
  }

  static #renderStatistics(statistics) {
    const statisticsTableBody = document.querySelector(
      ".modal-result-table tbody",
    );
    statisticsTableBody.replaceChildren(this.#createStatisticsRows(statistics));
  }

  static #createStatisticsRows(statistics) {
    const statsFragment = document.createDocumentFragment();
    statistics.forEach((stat) =>
      statsFragment.appendChild(this.#createStatisticRow(stat)),
    );
    return statsFragment;
  }

  static #createStatisticRow(stat) {
    const tr = document.createElement("tr");
    this.#formatPrizeDetail(stat).forEach((text) =>
      tr.appendChild(this.#createTableCell(text)),
    );
    return tr;
  }

  static #createTableCell(text) {
    const td = document.createElement("td");
    td.textContent = text;
    return td;
  }

  static #updateProfitRate(profitRate) {
    const profitTextSpan = document.querySelector(".modal-profit-value");
    profitTextSpan.textContent = profitRate;
  }

  static #formatPrizeDetail(prizeDetail) {
    const { matchCount, hasBonus, count, prize } = prizeDetail;
    const matchText = hasBonus ? `${matchCount}개+보너스볼` : `${matchCount}개`;
    return [matchText, prize.toLocaleString(), `${count}개`];
  }
}

export default WebOutputView;
