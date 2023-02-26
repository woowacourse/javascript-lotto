import { LOTTO } from '../../constants/setting';

const winningNumberInputItem = `
  <li>
    <input type="number" class="winning-number-input js-winning-number-input" min="${LOTTO.MIN_NUMBER_RANGE}" max="${LOTTO.MAX_NUMBER_RANGE}"/>
  </li>
`;

const bonusNumberInput = `
  <input type="number" class="winning-number-input js-bonus-number-input "min="${LOTTO.MIN_NUMBER_RANGE}" max="${LOTTO.MAX_NUMBER_RANGE}"/>
`;

const createTitle = (size, bonusSize) =>
  `<p>지난 주 당첨번호 ${size}개와 보너스 번호 ${bonusSize}개를 입력해주세요.</p>`;

const createWinningNumberForm = (size, bonusSize) => `
  <form id="winning-numbers-form">
    <div class="winning-number-input-container">
      <div>
        <p>당첨 번호</p>
        <ul class="winning-number-input-list">
          ${winningNumberInputItem.repeat(size)}
        </ul>
      </div>
      <div class="bonus-number-input-container">
        <p>보너스 번호</p>
        ${bonusNumberInput.repeat(bonusSize)}
      </div>
    </div>
    <button type="submit" class="button caption" id="result-button">결과 확인하기</button>
  </form>
`;

const createWinningNumberFormSection = (size = LOTTO.SIZE, bonusSize = LOTTO.BONUS_SIZE) => `
  <section class="lotto-game-section" id="winning-lotto-form-section">
    ${createTitle(size, bonusSize) + createWinningNumberForm(size, bonusSize)}
  </section>
`;

export default createWinningNumberFormSection;
