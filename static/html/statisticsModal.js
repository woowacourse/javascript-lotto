export default function statisticsModal(lottoRanks, totalProfitRate) {
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
          <div class="lm-wr-row-box">
            <div class="lm-wr-text">3개</div>
            <div class="lm-wr-text">5,000</div>
            <div class="lm-wr-text">${ranks[4]}개</div>
          </div>
          <div class="lm-wr-row-box">
            <div class="lm-wr-text">4개</div>
            <div class="lm-wr-text">50,000</div>
            <div class="lm-wr-text">${ranks[3]}개</div>
          </div>
          <div class="lm-wr-row-box">
            <div class="lm-wr-text">5개</div>
            <div class="lm-wr-text">1,500,000</div>
            <div class="lm-wr-text">${ranks[2]}개</div>
          </div>
          <div class="lm-wr-row-box">
            <div class="lm-wr-text">5개+보너스볼</div>
            <div class="lm-wr-text">30,000,000</div>
            <div class="lm-wr-text">${ranks[1]}개</div>
          </div>
          <div class="lm-wr-row-box">
            <div class="lm-wr-text">6개</div>
            <div class="lm-wr-text">2,000,000,000</div>
            <div class="lm-wr-text">${ranks[0]}개</div>
          </div>
        </div>
        <div class="lm-winning-statistics">당신의 총 수익률은 ${totalProfitRate}%입니다.</div>
        <button class="lm-retry-btn default-button">다시 시작하기</button>
      </div>
    </div>`;
}
