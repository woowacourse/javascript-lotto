export default class InputView {
  constructor() {
    this.$result = document.querySelector('#result');
    this.$lottoPriceInput = document.querySelector('#lotto-price-input');
  }

  renderWinningNumbersInput() {
    this.$result.insertAdjacentHTML('beforeend', this.makeWinningNumbersTemplate());
  }

  makeWinningNumbersTemplate() {
    return `
      <div>
        <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
        <div class="numbers-input">
          <div class="winning-numbers">
            <div class="winning-numbers-header">당첨 번호</div>
            <div class="winning-numbers-input">
              <input type="number" class="winning-number-input"/>
              <input type="number" class="winning-number-input"/>
              <input type="number" class="winning-number-input"/>
              <input type="number" class="winning-number-input"/>
              <input type="number" class="winning-number-input"/>
              <input type="number" class="winning-number-input"/>
            </div>
          </div>
          <div class="bonus-number">
            <div class="bonus-number-header">보너스 번호</div> 
            <input type="number" class="bonus-number-input"/>
          </div>
        </div>
        <button id="check-result-button" class="btn">결과 확인하기</button>
      </div>
    `;
  }

  initLottoPriceInput() {
    this.$lottoPriceInput.value = '';
  }
}
