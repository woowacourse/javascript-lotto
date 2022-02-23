import { RULES } from '../constants/index.js';

const PURCHASED_LOTTO_TEMPLATE = `
  <div id="purchased-lotto-box">
    <p>
      총 <span id="purchased-lotto-count"></span>개를 구매하였습니다.
    </p>
    <div id="purchased-lotto-list-off" ></div>
      <div id="purchased-lotto-list-on" class="hidden"></div>
  </div>
  <div id="toggle-box">
    <p>번호 보기</p>
    <label for="purchased-lotto-number-switch" class="switch">
      <input id="purchased-lotto-number-switch" type="checkbox" />
      <span class="slider round"></span>
    </label>
  </div>
`;

const LOTTO_IMAGE_TEMPLATE = `
  <span class="purchased-lotto-image">🎟️</span>
`;

const getLottoDetailTemplate = lotto => {
  return `
    <div class="purchased-lotto-item">
      ${LOTTO_IMAGE_TEMPLATE}
      <div class="purchased-lotto-number">${lotto.join(', ')}</div>
    </div>
  `;
};

const INPUT_ELEMENT = `<input type="number" class="winning-number-input" />`;

const LOTTO_NUMBER_FORM = `
  <form id="lotto-number-form">
    <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
    <div id="lotto-number-box">
      <div id="winning-number-box">
        <p>당첨 번호</p>
        <div class="input-box">
          ${INPUT_ELEMENT.repeat(RULES.LOTTO_COUNT)}
        </div>
      </div>
      <div id="bonus-number-box">
        <p>보너스 번호</p>
        <div class="input-box">
          ${INPUT_ELEMENT}
        </div>
      </div>
    </div>
    <button id="result-button" type="submit">결과 확인하기</button>
  </form>
`;

export {
  PURCHASED_LOTTO_TEMPLATE,
  LOTTO_IMAGE_TEMPLATE,
  LOTTO_NUMBER_FORM,
  getLottoDetailTemplate,
};
