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
