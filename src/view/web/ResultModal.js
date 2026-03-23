import closeIcon from "../../asset/close_modal_icon.svg";
import { RANK, RANK_DESCRIPTION, RANK_PRIZE } from "../../constant/index.js";
class ResultModal {
  constructor() {
    this.$modal = document.querySelector(".result-modal");
    this.$modalCloseButton = document.querySelector(
      ".result-modal__close-button",
    );
    this.$resultTableBody = document.querySelector(".result-modal__table-body");
    this.$profitRate = document.querySelector(".result-modal__profit-rate");
    this.$resetButton = document.querySelector(".result-modal__reset-button");
    this.initCloseButton();
  }

  initCloseButton() {
    this.$modalCloseButton.innerHTML = `<img src="${closeIcon}" alt="close" class="result-modal__close-icon" />`;
  }
  bindCloseModal() {
    this.$modalCloseButton.addEventListener("click", () => {
      this.$modal.classList.add("hidden");
    });
  }

  bindReset(handler) {
    this.$resetButton.addEventListener("click", () => {
      handler();
    });
  }

  renderResult(rankCounts, profitRate) {
    this.$resultTableBody.innerHTML = this._createResultTemplate(rankCounts);
    this.$profitRate.innerText = `당신의 총 수익률은 ${profitRate.toFixed(1)}%입니다.`;
    this.$modal.classList.remove("hidden");
  }

  _createResultTemplate(rankCounts) {
    const ranks = [
      RANK.FIFTH,
      RANK.FOURTH,
      RANK.THIRD,
      RANK.SECOND,
      RANK.FIRST,
    ];

    return ranks
      .map(
        (rank) => `
    <tr class="result-modal__table-row">
      <td>${RANK_DESCRIPTION[rank]}</td>
      <td>${RANK_PRIZE[rank].toLocaleString()}</td>
      <td>${rankCounts[rank] || 0}개</td>
    </tr>
  `,
      )
      .join("");
  }

  reset() {
    this.$modal.classList.add("hidden");
  }
}

export default ResultModal;
