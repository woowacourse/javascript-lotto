const makeTemplate = Object.freeze({
  makeWinningNumbersTemplate: () => `
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
  `,
  makeResultTemplate: (count) => `
    <div id="result-container">
      <div id="purchase-result">
        <div id="result-header">총 ${count}개를 구매하였습니다.</div>
        <div id="result-lotto">
          ${'<div class="lotto"><div class="lotto-icon">🎟️</div></div>'.repeat(count)}
        </div>
      </div>
      <div id="view-number">
          <div>번호 보기</div>
        <div class="toggle-switch">
          <input type="checkbox" id="view-checkbox" />
          <label for="view-checkbox">
            <span class="toggle-track"></span>
          </label>
        </div>
      </div>
    </div>
  `,

});

export default makeTemplate;
