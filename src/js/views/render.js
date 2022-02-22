import { $ } from '../utils/dom.js';
export const renderPurchasedLottoList = lottoCount => {
  const template = `<div> 
    <p class="purchased-lotto-list-title">총 ${lottoCount}를 구매하셨습니다</p>
    <p>번호보기</p>
    </div>
    <div>
        <div class="purchased-lotto-list"></div>
        <p class="toggle-button on"></p>
    </div>`;
  $('.purchased-lotto-list-container').insertAdjacentHTML(
    'beforeend',
    template,
  );
};

export const renderLastLottoNumber = () => {
  const template = `
    <div>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</div>
        <div>
          <p>당첨 번호</p>
          <p>보너스 번호</p>
        </div>
        <div class="last-lotto-number-input">
          <div class="last-lotto-winning-number-container">
            <input type="number" class="last-lotto-winning-number" />
            <input type="number" class="last-lotto-winning-number" />
            <input type="number" class="last-lotto-winning-number" />
            <input type="number" class="last-lotto-winning-number" />
            <input type="number" class="last-lotto-winning-number" />
            <input type="number" class="last-lotto-winning-number" />
          </div>
          <div class="last-lotto-bonus-number-container">
            <input type="number" class="last-lotto-bonus-number" />
          </div>
        </div>
        <button type="button" class="check-result-button">결과 확인하기</button>
    `;
  $('.last-lotto-number-container').insertAdjacentHTML('beforeend', template);
};
