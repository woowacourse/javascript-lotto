import { RULES } from '../constants/index.js';

export const getLottoListTemplate = lottos => {
  const initValue = '';

  const lottoListTemplate = lottos.reduce(
    (result, lotto) => (result += getLottoItemTemplate(lotto.getList())),
    initValue,
  );

  return lottoListTemplate;
};

const getLottoItemTemplate = lotto => {
  return `
    <div class="purchased-lotto-item">
    <span class="purchased-lotto-image">🎟️</span>
      <div class="purchased-lotto-number">${lotto.join(', ')}</div>
    </div>
  `;
};

export const PURCHASED_LOTTO_TEMPLATE = `
  <div>
    <div id="purchased-lotto-box">
      <p>
        총 <span id="purchased-lotto-count"></span>개를 구매하였습니다.
      </p>
      <div id="purchased-lotto-list" class="switch-off"></div>
    </div>
    <div id="switch-box">
      <p>번호 보기</p>
      <label for="on-off-switch" class="switch">
        <input id="on-off-switch" type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>
  </div>
`;

const INPUT_ELEMENT = `<input type="number" class="winning-number-input" />`;

export const WINNING_NUMBER_FORM = `
  <form id="winning-number-form">
    <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
    <div id="winning-number-boxes">
      <div id="win-number-box">   
        <p>당첨 번호</p>
        <div class="input-box">
        ${INPUT_ELEMENT.repeat(RULES.LOTTO_NUMS)}
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
