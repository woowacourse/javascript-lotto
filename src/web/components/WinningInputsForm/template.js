import { LOTTO } from '../../../common/constants/Configurations.js';

const getInstructionMarkup = () =>
  `<label>지난 주 당첨번호 ${LOTTO.LENGTH}개와 보너스 번호 1개를 입력해주세요.</label>`;

const getInputsLabelsMarkup = () => `
  <div class="inputs-label">
    <label>당첨 번호</label>
    <label>보너스 번호</label>
  </div>
`;

const generateWinningNumbers = (count, maxlength) =>
  Array.from(
    { length: count },
    () =>
      `<input type="text" class="number-input winning" maxlength="${maxlength}" />`,
  ).join('');

const generateInputs = (count, maxlength) => `
  <div class="winning-inputs">
    <div class="winning-numbers">
      ${generateWinningNumbers(count, maxlength)}
    </div>
    <input type="text" class="number-input bonus" maxlength="${maxlength}" />
  </div>
`;

const getButtonMarkup = () =>
  `<button class="result-button" disabled>결과 확인하기</button>`;

export {
  getInstructionMarkup,
  getInputsLabelsMarkup,
  generateInputs,
  getButtonMarkup,
};
