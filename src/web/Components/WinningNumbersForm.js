const WinningNumbersForm = () => {
  return /* html */ `
  <label>지난주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</label>
  <div id="winning-numbers-input-field">
    <div id="winning-numbers-container">
      <label>당첨 번호</label>
      <div id="winning-numbers-inputs">
        <input type="number" class="winning-number-input" required />
        <input type="number" class="winning-number-input" required />
        <input type="number" class="winning-number-input" required />
        <input type="number" class="winning-number-input" required />
        <input type="number" class="winning-number-input" required />
        <input type="number" class="winning-number-input" required />
      </div>
    </div>
    <div id="bonus-number-container">
      <label>보너스 번호</label>
      <input type="number" id="bonus-number-input" required />
    </div>
    </div>
  <p id="winning-numbers-result"></p>
  <button type="submit" id="winning-numbers-submit-button">결과 확인하기</button>`;
};

export default WinningNumbersForm;
