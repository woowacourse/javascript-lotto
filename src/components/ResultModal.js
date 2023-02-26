class ResultModal {
  #isRendered;

  constructor() {
    this.#isRendered = false;
  }

  render(winningRankResult, profitRateOfPrize) {
    const renderData = `
    <div class="modal-view">
      <div class="close-button">
        <button class="close-modal">X</button>
      </div>
      <h2>🏆 당첨 통계 🏆</h2>
      <table class="rank-result">
        <tr>
          <th>일치 갯수</th>
          <th>당첨금</th>
          <th>당첨 갯수</th>
        </tr>
        <tr>
          <td>3개</td>
          <td>5,000</td>
          <td>${winningRankResult[5000]} 개</td>
        </tr>
        <tr>
          <td>4개</td>
          <td>50,000</td>
          <td>${winningRankResult[50000]}개</td>
        </tr>
        <tr>
          <td>5개</td>
          <td>1,500,000</td>
          <td>${winningRankResult[1500000]}개</td>
        </tr>
        <tr>
          <td>5개+보너스볼</td>
          <td>30,000,000</td>
          <td>${winningRankResult[30000000]}개</td>
        </tr>
        <tr>
          <td>6개</td>
          <td>2,000,000,000</td>
          <td>${winningRankResult[2000000000]}개</td>
        </tr>
      </table>
      <p>당신의 총 수익률은 ${profitRateOfPrize.toFixed(1)}%입니다.</p>
      <button class="restart-button">다시 시작하기</button>
    </div>
    `;

    const div = document.createElement('div');
    document.querySelector('body').appendChild(div);
    div.innerHTML = renderData;
    this.#isRendered = true;

    document.querySelector('.close-modal').addEventListener('click', this.closeResultModal);
    document.querySelector('.restart-button').addEventListener('click', this.restartGame);
  }

  isRendered() {
    return this.#isRendered;
  }

  closeResultModal(e) {
    const modal = document.querySelector('.modal-view');
    modal.className += ' modal-none';
  }

  restartGame(e) {
    location.reload();
  }
}

export default ResultModal;
