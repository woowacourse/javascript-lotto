const WINNING_NUMBERS_FORM = `
<form id="winning-lotto-form">
  <span> 지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요. </span>
  <div id="winning-lottos-container">
    <div id="winning-numbers">
      <label for="winning-numbers">당첨 번호</label>
      <div id="numbers-input">
        <input id="winning-number" type="number" />
        <input id="winning-number" type="number" />
        <input id="winning-number" type="number" />
        <input id="winning-number" type="number" />
        <input id="winning-number" type="number" />
        <input id="winning-number" type="number" />
      </div>
    </div>
    <div id="bonus-number">
      <label for="bonus">보너스 번호</label>
      <input id="bonus" type="number" />
    </div>
  </div>
  <button type="submit" id="check-result-btn">결과 확인하기</button>
</form>
`;

module.exports = WINNING_NUMBERS_FORM;
