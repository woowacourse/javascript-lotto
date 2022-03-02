import { RULES, REWARD } from '../constants/index.js';

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

const INPUT_ELEMENT = `<input type="number" class="winning-number-input" min="1" max="45" maxlength="2" />`;

const WINNING_NUMBER_FORM = `
  <form id="winning-number-form">
    <label class="winning-number-label">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</label>
    <div id="winning-number-boxes">
      <div id="win-number-box">   
        <label class="winning-number-label">당첨 번호</label>
        <div class="input-box">
          ${INPUT_ELEMENT.repeat(RULES.LOTTO_NUMS)}
        </div>
      </div>
      <div id="bonus-number-box">
        <label class="winning-number-label">보너스 번호</label>
        <div class="input-box">
          ${INPUT_ELEMENT}
        </div>
      </div>
    </div>
    <button id="result-button" type="submit">결과 확인하기</button>
  </form>
`;

const getResultTemplate = (result, percent) => `
  <div>
    <table>
      <thead>
        <tr>
          <th>일치 개수</th>
          <th>당첨금</th>
          <th>당첨 개수</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>3개</td>
          <td>${REWARD.FIFTH.toLocaleString('ko-KR')}</td>
          <td>${result.filter(correct => correct.win === 3).length}개</td>
        </tr>
        <tr>
          <td>4개</td>
          <td>${REWARD.FOURTH.toLocaleString('ko-KR')}</td>
          <td>${result.filter(correct => correct.win === 4).length}개</td>
        </tr>
        <tr>
          <td>5개</td>
          <td>${REWARD.THIRD.toLocaleString('ko-KR')}</td>
          <td>
            ${
              result.filter(correct => correct.win === 5 && correct.bonus === 0)
                .length
            }개
          </td>
        </tr>
        <tr>
          <td>5개+보너스볼</td>
          <td>${REWARD.SECOND.toLocaleString('ko-KR')}</td>
          <td>
            ${
              result.filter(correct => correct.win === 5 && correct.bonus === 1)
                .length
            }개
          </td>
        </tr>
        <tr>
          <td>6개</td>
          <td>${REWARD.FIRST.toLocaleString('ko-KR')}</td>
          <td>${result.filter(correct => correct.win === 6).length}개</td>
        </tr>
      </tbody>
    </table>
    <div id="result-percent">
      당신의 총 수익률은 ${percent.toLocaleString('ko-KR')}%입니다.
    </div>
    <button id="restart-button">다시 시작하기</button>
  </div>
`;

export {
  PURCHASED_LOTTO_TEMPLATE,
  LOTTO_IMAGE_TEMPLATE,
  WINNING_NUMBER_FORM,
  getLottoListTemplate,
  getResultTemplate,
};
