import { PRIZE_MONEY } from "../../constants/lottoConstants";

const html = String.raw;

export default class ModalView {
  constructor() {
    this.$overlay = document.querySelector("#result-modal");
    this.$closeButton = this.$overlay.querySelector(".modal-close");
    this.$restartButton = this.$overlay.querySelector("#restart-btn");
    this.$rowsContainer = this.$overlay.querySelector("#result-rows");
    this.$benefitMessage = this.$overlay.querySelector(".benefit-messege");
  }

  renderStatistics(statistics) {
    const rank = [
      { key: "5", label: "3개" },
      { key: "4", label: "4개" },
      { key: "3", label: "5개" },
      { key: "2", label: "5개 + 보너스" },
      { key: "1", label: "6개" },
    ];

    const rowsHtml = rank
      .map(({ key, label }) => {
        const prize = PRIZE_MONEY[key] ?? 0;
        const count = statistics ? statistics[key] : 0;
        return html`
          <div class="row">
            <div class="row-item">${label}</div>
            <div class="row-item">${prize.toLocaleString("ko-KR")}원</div>
            <div class="row-item">${count}개</div>
          </div>
        `;
      })
      .join("");

    this.$rowsContainer.innerHTML = rowsHtml;
  }

  renderRate(rate) {
    if (this.$benefitMessage) {
      this.$benefitMessage.textContent = `총 수익률은 ${rate}%입니다.`;
    }
  }

  bindClose(handler) {
    this.$closeButton.addEventListener("click", handler);
  }

  bindRestart(handler) {
    this.$restartButton.addEventListener("click", handler);
  }

  open() {
    this.$overlay.hidden = false;
  }
  close() {
    this.$overlay.hidden = true;
  }
}
