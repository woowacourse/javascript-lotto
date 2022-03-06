const makeTemplate = Object.freeze({
  makeWinningNumbersTemplate: () => `
    <div>
      <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
      <form id="winning-numbers-form">
        <div class="numbers-input">

          <div class="winning-numbers">
            <label class="winning-numbers-header">당첨 번호</label>

            <div class="winning-numbers-input">
              <input type="text" class="winning-number-input" pattern="^[1-9]{1}$|^[1-3]{1}[0-9]{1}$|^4{1}[0-5]{1}$" title="1과 45사이의 숫자를 입력하세요" required maxlength="2"/ >
              <input type="text" class="winning-number-input" pattern="^[1-9]{1}$|^[1-3]{1}[0-9]{1}$|^4{1}[0-5]{1}$" title="1과 45사이의 숫자를 입력하세요" required maxlength="2"/ >
              <input type="text" class="winning-number-input" pattern="^[1-9]{1}$|^[1-3]{1}[0-9]{1}$|^4{1}[0-5]{1}$" title="1과 45사이의 숫자를 입력하세요" required maxlength="2"/ >
              <input type="text" class="winning-number-input" pattern="^[1-9]{1}$|^[1-3]{1}[0-9]{1}$|^4{1}[0-5]{1}$" title="1과 45사이의 숫자를 입력하세요" required maxlength="2"/ >
              <input type="text" class="winning-number-input" pattern="^[1-9]{1}$|^[1-3]{1}[0-9]{1}$|^4{1}[0-5]{1}$" title="1과 45사이의 숫자를 입력하세요" required maxlength="2"/ >
              <input type="text" class="winning-number-input" pattern="^[1-9]{1}$|^[1-3]{1}[0-9]{1}$|^4{1}[0-5]{1}$" title="1과 45사이의 숫자를 입력하세요" required maxlength="2"/ >
            </div>
          </div>
          <div class="bonus-number">
            <label class="bonus-number-header">보너스 번호</label> 
            <input type="text" class="bonus-number-input winning-number-input" pattern="^[1-9]{1}$|^[1-3]{1}[0-9]{1}$|^4{1}[0-5]{1}$" title="1과 45사이의 숫자를 입력하세요" required maxlength='2'/>
          </div>
        </div>
        <div class="input-error-message" id="winning-input-message"></div>
        <button id="check-result-button" class="btn" disabled>결과 확인하기</button>
      </form>
    </div>
    `,

  makePopupTemplate: ({ winningType, earningRate }) => `
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
