import { $ } from './utils/index.js';

const getDefaultLottoListTemplate = (count) => '<p class="lotto">🎟️</p>'.repeat(count);

const getDetailLottoListTemplate = (lottos) => {
  return lottos
    .map((lotto) => `<p class="lotto">🎟️<span class="lotto-number">${lotto.join(', ')}</span></p>`)
    .join('');
};

const lottoMatchSectionTemplate = `
  <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
  <div class="lotto-match-header">
    <p>당첨 번호</p>
    <p>보너스 번호</p>
  </div>
  <div class="number-container">
    <div class="match-numbers">
      <input class="lotto-app-input match-number-input" type="number" min="1" max="45"/>
      <input class="lotto-app-input match-number-input" type="number" min="1" max="45"/>
      <input class="lotto-app-input match-number-input" type="number" min="1" max="45"/>
      <input class="lotto-app-input match-number-input" type="number" min="1" max="45"/>
      <input class="lotto-app-input match-number-input" type="number" min="1" max="45"/>
      <input class="lotto-app-input match-number-input" type="number" min="1" max="45"/>
    </div>
    <div class="bonus-number">
      <input class="lotto-app-input match-number-input" type="number" />
    </div>
  </div>
  <button id="result-button" class="lotto-app-button">결과 확인하기</button>
`;

const winningStatisticModalTempalte = `
  <div id="winning-statistic-modal">
    <div id="winning-statistic-modal-content">
        <button id="winning-statistic-modal-close-button">X</button>
        <p id="winning-statistic-modal-title">🏆당첨 통계🏆</p>
        <div id="winning-result-container">
          <div class="winning-result-item">일치 갯수</div>
          <div class="winning-result-item">당첨금</div>
          <div class="winning-result-item">당첨 갯수</div>
          <div class="winning-result-item">3개</div>
          <div class="winning-result-item">5,000</div>
          <div class="winning-result-item"><span class="winning-count">n</span>개</div>
          <div class="winning-result-item">4개</div>
          <div class="winning-result-item">5,0000</div>
          <div class="winning-result-item"><span class="winning-count">n</span>개</div>
          <div class="winning-result-item">5개</div>
          <div class="winning-result-item">1,500,000</div>
          <div class="winning-result-item"><span class="winning-count">n</span>개</div>
          <div class="winning-result-item">5개+보너스볼</div>
          <div class="winning-result-item">30,000,000</div>
          <div class="winning-result-item"><span class="winning-count">n</span>개</div>
          <div class="winning-result-item">6개</div>
          <div class="winning-result-item">2,000,000,000</div>
          <div class="winning-result-item"><span class="winning-count">n</span>개</div>
        </div>
        <p id="rate-of-return-text">당신의 총 수익률은 <span></span>%입니다.</p>
        <button id="restart-button" class="lotto-app-button">다시 시작하기</button>
    </div>
  </div>
`;

const view = {
  renderLottoList(lottos) {
    this.renderDefaultLottoArea(lottos.length);
    this.renderDetailLottoArea(lottos);
    $('#lotto-count').innerText = lottos.length;
  },

  renderDefaultLottoArea(count) {
    $('#lottos-container .lottos.default').innerHTML = getDefaultLottoListTemplate(count);
  },

  renderDetailLottoArea(lottos) {
    $('#lottos-container .lottos.detail').innerHTML = getDetailLottoListTemplate(lottos);
  },

  renderFare(fare) {
    $('#fare-input').value = fare;
  },

  renderLottoMatchSection() {
    $('.lotto-match-section').innerHTML = lottoMatchSectionTemplate;
  },

  renderWinningStatisticModal() {
    $('#app').insertAdjacentHTML('beforeend', winningStatisticModalTempalte);
  },

  deactivateFareForm() {
    $('#fare-input').setAttribute('disabled', true);
    $('#fare-button').setAttribute('disabled', true);
  },
};

export default view;
