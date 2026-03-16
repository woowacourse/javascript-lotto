import registerHandler from "../service/registerHandler.js";

const LottoResult = (rank, returnRate) => {
  registerHandler(".lotto-result__close-button", "click", () => {
    document.querySelector(".lotto-result").remove();
  });

  registerHandler(".lotto-result__retry-button", "click", () => {
    document.querySelector(".lotto-result").remove();
    location.reload();
  });

  return `
    <div class="lotto-result-container">
      <div class="lotto-result__dimmed"></div>
      <div class="lotto-result__content">
        <button class="lotto-result__close-button">
          <img src="${import.meta.env.BASE_URL}assets/Close.png" alt="닫기" width="14px" />
        </button>
        <div class="lotto-result__title-wrapper">
          <h2 class="lotto-result__title">🏆 당첨 통계 🏆</h2>
        </div>
        <table class="lotto-result__table">
          <thead class="lotto-result__table-header">
            <tr>
              <th>일치 갯수</th>
              <th>당첨금</th>
              <th>당첨 갯수</th>
            </tr>
          </thead>
          <tbody class="lotto-result__table-body">
            <tr>
              <td>3개</td>
              <td>5,000</td>
              <td>${rank[5] || 0}개</td>
            </tr>
            <tr>
              <td>4개</td>
              <td>50,000</td>
              <td>${rank[4] || 0}개</td>
            </tr>
            <tr>
              <td>5개</td>
              <td>1,500,000</td>
              <td>${rank[3] || 0}개</td>
            </tr>
            <tr>
              <td>5개+보너스볼</td>
              <td>30,000,000</td>
              <td>${rank[2] || 0}개</td>
            </tr>
            <tr>
              <td>6개</td>
              <td>2,000,000,000</td>
              <td>${rank[1] || 0}개</td>
            </tr>
          </tbody>
        </table>
        <p class="lotto-result__return-rate">당신의 총 수익률은 ${returnRate}%입니다.</p>
        <button class="lotto-result__retry-button">다시 시작하기</button>
      </div>
    </div>
  `;
};

export default LottoResult;
