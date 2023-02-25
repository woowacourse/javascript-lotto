const TEMPLATE = ({ countOfRanks, rateOfProfit }) => `
  <div id="modal-background">
    <div id="modal-container">
      <div id="exit-button-wrapper">
        <button id="exit-button">X</button>
      </div>
      <div id="modal-contents">
        <h2>🏆 당첨 통계 🏆</h2>
        <table>
          <thead>
            <tr>
              <th>일치 갯수</th>
              <th>당첨금</th>
              <th>당첨 갯수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3개</td>
              <td class="win-lotto-money">5,000</td>
              <td class="win-lotto-count">${countOfRanks[4]}개</td>
            </tr>
            <tr>
              <td>4개</td>
              <td class="win-lotto-money">50,000</td>
              <td class="win-lotto-count">${countOfRanks[3]}개</td>
            </tr>
            <tr>
              <td>5개</td>
              <td class="win-lotto-money">1,500,000</td>
              <td class="win-lotto-count">${countOfRanks[2]}개</td>
            </tr>
            <tr>
              <td>5개+보너스볼</td>
              <td class="win-lotto-money">30,000,000</td>
              <td class="win-lotto-count">${countOfRanks[1]}개</td>
            </tr>
            <tr>
              <td>6개</td>
              <td class="win-lotto-money">2,000,000,000</td>
              <td class="win-lotto-count">${countOfRanks[0]}개</td>
            </tr>
          </tbody>
        </table>
        <div id="earning-text">당신의 총 수익률은 ${rateOfProfit}%입니다</div>
        <div id="modal-footer">
          <button id="restart-lotto-button">다시 시작하기</button>
        </div>
      </div>
    </div>
  </div>
`;

class ResultModalView {
  constructor() {
    this.container = document.getElementById('modal');
  }

  render(statistics) {
    this.reset();
    this.container.insertAdjacentHTML('beforeend', TEMPLATE(statistics));
    this.getExitButtonTag();
  }

  getExitButtonTag() {
    this.exitButton = document.getElementById('exit-button');
    this.restartButton = document.getElementById('restart-lotto-button');
  }

  reset() {
    this.container.replaceChildren();
  }
}

export default ResultModalView;
