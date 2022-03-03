import { $ } from '../utils/dom.js';

export const renderPurchasedLottoList = lottoCount => {
  const template = `
    <div class="purchased-lotto-header"> 
      <p class="purchased-lotto-list-title">총 ${lottoCount}를 구매하셨습니다</p>
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
    <div class="lotto-item-number">${lotto}</div></div>`;
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

export const renderOpenResultModal = () => {
  $('#app').classList.toggle('disabled');

  const template = `
    <div id='modal' class='modal-overlay'>
    <div class='modal-window'>
      <header class='modal-window-header'>
        <div class='modal-window-X-button-container'>
          <span class='modal-window-X-button'>✖</span>
        </div>
        <div class='modal-window-title'><h2>🏆 당첨 통계 🏆</h2></div>
      </header>
      <main class='modal-window-main'>
        <table>
          <thead>
            <tr>
              <th>일치 갯수</th><th>당첨금</th><th>당첨 갯수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3개</td><td>5,000</td><td>n개</td>
            </tr>
            <tr>
              <td>4개</td><td>50,000</td><td>n개</td>
            </tr>
            <tr>
              <td>5개</td><td>1,500,000</td><td>n개</td>
            </tr>
            <tr>
              <td>5개+보너스볼</td><td>30,000,000</td><td>n개</td>
            </tr>
            <tr>
              <td>6개</td><td>2,000,000,000</td><td>n개</td>
            </tr>
          </tbody>
        </table>
        <div class='modal-window-earning-rate'>
          <h3>당신의 총 수익률은 %입니다.</h3>
        </div>
      </main>
      <footer class='modal-window-footer'>
        <div>
          <button class='restart-button'>다시 시작하기</button>
        </div>
      </footer>
    </div>
    </div>
  `;
  $('#app').insertAdjacentHTML('afterend', template);
};
