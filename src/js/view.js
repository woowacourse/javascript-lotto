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
  <button class="lotto-app-button result-button">결과 확인하기</button>
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

  deactivateFareForm() {
    $('#fare-input').setAttribute('disabled', true);
    $('#fare-button').setAttribute('disabled', true);
  },
};

export default view;
