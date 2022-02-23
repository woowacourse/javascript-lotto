export default class PopupView {
  constructor() {
    this.$popup = document.querySelector('#popup');
    this.$mainContainer = document.querySelector('.main-container');
  }

  makePopupTemplate(winningType, earningRate) {
    return `
      <div class="popup-container">
        <button id="close-popup-button">X</button>
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
              <td>5,000</td>
              <td>${winningType['3']}개</td>
            </tr>
            <tr>
              <td>4개</td>
              <td>5,0000</td>
              <td>${winningType['4']}개</td>
            </tr>
            <tr>
              <td>5개</td>
              <td>1,500,000</td>
              <td>${winningType['5']}개</td>
            </tr>
            <tr>
              <td>5개+보너스볼</td>
              <td>30,000,000</td>
              <td>${winningType['5.5']}개</td>
            </tr>
            <tr>
              <td>6개</td>
              <td>2,000,000,000</td>
              <td>${winningType['6']}개</td>
            </tr>
          </tbody>
        </table>
        <p class="earning-rate">당신의 총 수익률은 ${earningRate}% 입니다</p>
        <button id="restart-button" class="btn">다시 시작하기</button>
      </div>
    `;
  }

  renderPopup(winningType, earningRate) {
    this.$popup.insertAdjacentHTML('beforeend', this.makePopupTemplate(winningType, earningRate));
  }

  toggleMainContainerState() {
    this.$mainContainer.classList.toggle('blocked');
    this.$popup.classList.toggle('emphasized');
  }

  closePopup() {
    this.$popup.replaceChildren();
  }
}
