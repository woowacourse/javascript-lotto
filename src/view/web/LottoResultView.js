import { ResultRow } from "../../components/ResultRow";
import { CONDITION, PRIZE } from "../../constants/lottoInfo";

export const renderLottoResult = (rankCount, profitRate) => {
  const resultModal = document.querySelector("#result-modal");
  const ranks = [5, 4, 3, 2, 1];
  const profitRateStr = profitRate.toLocaleString("ko-KR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  resultModal.innerHTML = `
    <div class="modal-inner">
      <button type="button" id="modal-close-btn" class="modal-close-btn">X</button>
      
      <h2 class="modal-title">🏆 당첨 통계 🏆</h2>
      <table class="result-table">
        <thead>
          <tr>
            <th>일치 갯수</th>
            <th>당첨금</th>
            <th>당첨 갯수</th>
          </tr>
        </thead>
        <tbody>
          ${ranks
            .map((rank) =>
              ResultRow(CONDITION[rank], PRIZE[rank], rankCount[rank]),
            )
            .join("")}
        </tbody>
      </table>
      <p class="profit-text">당신의 총 수익률은 ${profitRateStr}%입니다.</p>
      <button id="restart-button" class="restart-button">다시 시작하기</button>
    </div>
  `;

  resultModal.showModal();
};
