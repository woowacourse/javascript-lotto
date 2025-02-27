const getInstructionMarkup = () =>
  `<label>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</label>`;

const getInputsLabelsMarkup = () => `
  <div class="inputs-label">
    <label>당첨 번호</label>
    <label>보너스 번호</label>
  </div>
`;

const generateWinningNumbers = ({ count, className, maxlength }) =>
  Array.from(
    { length: count },
    () =>
      `<input type="text" class="number-input ${className}" maxlength="${maxlength}" />`,
  ).join('');

const generateInputs = (data) =>
  `<div class="winning-inputs">
    <div class="winning-numbers">
      ${generateWinningNumbers(data)}
    </div>
    <input type="text" class="number-input bonus" maxlength="2" />
  </div>`;

const getButtonMarkup = () =>
  `<button class="big-button" disabled>결과 확인하기</button>`;

export {
  getInstructionMarkup,
  getInputsLabelsMarkup,
  generateInputs,
  getButtonMarkup,
};
