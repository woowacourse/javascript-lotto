const winningNumberInputItem =
  '<li><input type="number" class="winning-number-input js-winning-number-input" min="1" max="45"/></li>';
const bonusNumberInput =
  '<input type="number" class="winning-number-input js-bonus-number-input "min="1 "max="45"/>';

const createTitle = (size, bonusSize) =>
  `<p>지난 주 당첨번호 ${size}개와 보너스 번호 ${bonusSize}개를 입력해주세요.</p>`;

const createWinningNumberForm = (size, bonusSize) => `
  <form id="winning-numbers-form">
    <div class="winning-number-input-container">
      <p>당첨 번호</p>
      <ul class="winning-number-input-list">
        ${winningNumberInputItem.repeat(size)}
      </ul>
    </div>
    <div class="winning-number-input-container bonus-number">
      <p>보너스 번호</p>
      ${bonusNumberInput.repeat(bonusSize)}
    </div>
  </form>
  <button type="submit" form="winning-numbers-form" class="button caption" id="result-button">결과 확인하기</button>
`;

const createWinningNumberFormSection = (size, bonusSize) => `
  <section class="lotto-game-section" id="winning-lotto-form-section">
    ${createTitle(size, bonusSize) + createWinningNumberForm(size, bonusSize)}
  </section>
`;

export default createWinningNumberFormSection;
