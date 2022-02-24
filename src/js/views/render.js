import { $ } from '../utils/dom.js';
export const renderPurchasedLottoList = lottoCount => {
  const template = `
    <div class="purchased-lotto-header"> 
    <p class="purchased-lotto-list-title">총 ${lottoCount} 개를 구매하셨습니다</p>
    <p>번호보기</p>
    </div>
    <div class="purchased-lotto-main">
        <label class="toggle-button">
          <input type="checkbox" class="checkbox">
          <span class="onoff-switch"></span>
        </label>
    </div>`;
  $('.purchased-lotto-list-container').insertAdjacentHTML(
    'beforeend',
    template,
  );
  renderPurchasedLottoListContent(lottoCount);
};

export const renderPurchasedLottoListContent = lottoCount => {
  removePurchasedLottoList();
  const template = `
  <div class="purchased-lotto-list">
  ${'<p>🎟️</p>'.repeat(lottoCount)}
  </div> `;
  $('.purchased-lotto-main').insertAdjacentHTML('afterbegin', template);
};

export const renderPurchasedLottoListContentIsActive = lottoObject => {
  removePurchasedLottoList();

  const template = `
  <div class="purchased-lotto-list is-active">
  ${lottoObject
    .map(lotto => {
      return `<div class="lotto-item-container"><p>🎟️</p>
    <div class="lotto-item-number">${lotto.numbers}</div></div>`;
    })
    .join('')}
  </div>
  `;
  $('.purchased-lotto-main').insertAdjacentHTML('afterbegin', template);
};

export const removePurchasedLottoList = () => {
  if ($('.purchased-lotto-list')) {
    $('.purchased-lotto-list').remove();
  }
};
export const renderLastLottoNumber = () => {
  const template = `
    <div class="last-lotto-winning-number-title">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</div>
    <div class="last-lotto-winning-number-header">
      <p>당첨 번호</p>
      <p>보너스 번호</p>
    </div>
    <div class="last-lotto-winning-number-main">
      <div class="last-lotto-winning-number-main-container">
        <input type="number" class="last-lotto-winning-number-input" />
        <input type="number" class="last-lotto-winning-number-input" />
        <input type="number" class="last-lotto-winning-number-input" />
        <input type="number" class="last-lotto-winning-number-input" />
        <input type="number" class="last-lotto-winning-number-input" />
        <input type="number" class="last-lotto-winning-number-input" />
      </div>
      <div class="last-lotto-bonus-number-container">
        <input type="number" class="last-lotto-winning-number-input" />
      </div>
    </div>
    <button type="button" class="check-result-button">결과 확인하기</button>
    `;
  $('.last-lotto-winning-number-container').insertAdjacentHTML(
    'beforeend',
    template,
  );
};

export const renderLastLottoNumber = () => {
  const template = `
    <div class="last-lotto-winning-number-title">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</div>
    <div class="last-lotto-winning-number-header">
      <p>당첨 번호</p>
      <p>보너스 번호</p>
    </div>
    <div class="last-lotto-winning-number-main">
      <div class="last-lotto-winning-number-main-container">
        <input type="number" class="last-lotto-winning-number-input" />
        <input type="number" class="last-lotto-winning-number-input" />
        <input type="number" class="last-lotto-winning-number-input" />
        <input type="number" class="last-lotto-winning-number-input" />
        <input type="number" class="last-lotto-winning-number-input" />
        <input type="number" class="last-lotto-winning-number-input" />
      </div>
      <div class="last-lotto-bonus-number-container">
        <input type="number" class="last-lotto-winning-number-input" />
      </div>
    </div>
    <button type="button" class="check-result-button">결과 확인하기</button>
    `;
  $('.last-lotto-winning-number-container').insertAdjacentHTML(
    'beforeend',
    template,
  );
};
