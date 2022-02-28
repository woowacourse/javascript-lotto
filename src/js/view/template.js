import { RULES } from '../constants/index.js';

const LOTTO_IMAGE_TEMPLATE = `
  <span class="purchased-lotto-image">🎟️</span>
`;

const getLottoListTemplate = lottos => {
  return lottos.reduce((result, lotto) => {
    return (result += getLottoDetailTemplate(lotto.getList()));
  }, '');
};

const getLottoDetailTemplate = lotto => {
  return `
    <div class="purchased-lotto-item">
      ${LOTTO_IMAGE_TEMPLATE}
      <div class="purchased-lotto-number">${lotto.join(', ')}</div>
    </div>
  `;
};

const PURCHASED_LOTTO_TEMPLATE = `
  <div>
    <div id="purchased-lotto-box">
      <p>
        총 <span id="purchased-lotto-count"></span>개를 구매하였습니다.
      </p>
      <div id="single-purchased-lotto-list"></div>
      <div id="detail-purchased-lotto-list" class="hidden"></div>
    </div>
    <div id="toggle-box">
      <p>번호 보기</p>
      <label for="on-off-switch" class="switch">
        <input id="on-off-switch" type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>
  </div>
`;

const INPUT_ELEMENT = `<input type="number" class="winning-number-input" />`;

const WINNING_NUMBER_FORM = `
  <form id="winning-number-form">
    <label>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</label>
    <div id="winning-number-boxes">
      <div id="win-number-box">   
        <label>당첨 번호</label>
        <div class="input-box">
        ${INPUT_ELEMENT.repeat(RULES.LOTTO_NUMS)}
        </div>
      </div>
      <div id="bonus-number-box">
        <label>보너스 번호</label>
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
  WINNING_NUMBER_FORM,
  getLottoListTemplate,
};
