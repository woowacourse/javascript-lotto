const WINNING_NUMBERS_FORM = `
<form id="lotto-form">
  <span> 지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요. </span>
  <div id="winning-numbers">
    <label for="winning-numbers">당첨 번호</label>
    <input id="lotto1" type="number" />
    <input id="lotto2" type="number" />
    <input id="lotto3" type="number" />
    <input id="lotto4" type="number" />
    <input id="lotto5" type="number" />
    <input id="lotto6" type="number" />
  </div>
  <div id="bonus-number">
    <label for="bonus">보너스 번호</label>
    <input id="bonus" type="number" />
  </div>
  <button type="submit" id="lotto-btn">결과 확인하기</button>
</form>
`;

module.exports = WINNING_NUMBERS_FORM;
