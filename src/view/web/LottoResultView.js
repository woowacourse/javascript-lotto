import { ResultRow } from "../../components/ResultRow";
import { CONDITION, PRIZE } from "../../constants/lottoInfo";

export const renderLottoResult = (rankCount, profitRate) => {
  const tbody = document.querySelector("#result-tbody");
  const profitText = document.querySelector("#profit-text");

  const ranks = [5, 4, 3, 2, 1];
  tbody.innerHTML = ranks
    .map((rank) => ResultRow(CONDITION[rank], PRIZE[rank], rankCount[rank]))
    .join("");

  const profitRateStr = profitRate.toLocaleString("ko-KR", {
    maximumFractionDigits: 1,
  });
  profitText.textContent = `당신의 총 수익률은 ${profitRateStr}%입니다.`;

  document.querySelector("#result-modal").showModal();
};
