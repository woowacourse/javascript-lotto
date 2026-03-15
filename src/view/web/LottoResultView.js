import { ResultRow } from "../../components/ResultRow";
import { CONDITION, PRIZE } from "../../constants/lottoInfo";

const LottoResultView = {
  resultModal: document.querySelector("#result-modal"),
  tbody: document.querySelector("#result-tbody"),
  profitText: document.querySelector("#profit-text"),
  closeBtn: document.querySelector("#modal-close-btn"),
  restartBtn: document.querySelector("#restart-btn"),

  onClose() {
    this.closeBtn.addEventListener("click", () => {
      this.resultModal.close();
    });
  },

  onRestart(handler) {
    this.restartBtn.addEventListener("click", () => {
      handler();
      this.resultModal.close();
    });
  },

  renderResult(rankCount, profitRate) {
    const ranks = [5, 4, 3, 2, 1];
    this.tbody.innerHTML = ranks
      .map((rank) => ResultRow(CONDITION[rank], PRIZE[rank], rankCount[rank]))
      .join("");

    const profitRateStr = profitRate.toLocaleString("ko-KR", {
      maximumFractionDigits: 1,
    });
    this.profitText.textContent = `당신의 총 수익률은 ${profitRateStr}%입니다.`;

    this.resultModal.showModal();
  },
};

export default LottoResultView;
