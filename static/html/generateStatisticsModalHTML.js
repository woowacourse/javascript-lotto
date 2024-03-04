export default function generateStatisticsModalHTML(lottoRanks, totalProfitRate) {
  const ranks = lottoRanks.map((rank) => rank[1]);
  return `<div class="modal-body">
      <div class="lotto-modal">
        <button class="lm-close-btn">X</button>
        <h2 class="lm-title">🏆 당첨 통계 🏆</h2>
        <div class="lm-winning-result-group">
          <div class="lm-wr-row-box">
            <div class="lm-wr-text">일치 갯수</div>
            <div class="lm-wr-text">당첨금</div>
            <div class="lm-wr-text">당첨 갯수</div>
          </div>
          ${displayWinningResultList(ranks)}
        </div>
        <div class="lm-winning-statistics">당신의 총 수익률은 ${totalProfitRate}%입니다.</div>
        <button class="lm-retry-btn default-button" id="retry-btn">다시 시작하기</button>
      </div>
    </div>`;
}

function displayWinningResultList(ranks) {
  const reward = [
    ['3개', '5,000'],
    ['4개', '50,000'],
    ['5개', '1,500,000'],
    ['5개+보너스볼', '30,000,000'],
    ['6개', '2,000,000,000'],
  ];
  let winningResult = '';
  [...ranks].reverse().forEach((rank, idx) => {
    winningResult += `
    <div class="lm-wr-row-box">
      <div class="lm-wr-text">${reward[idx][0]}</div>
      <div class="lm-wr-text">${reward[idx][1]}</div>
      <div class="lm-wr-text">${rank}</div>
    </div>
    `;
  });
  return winningResult;
}
