import { $ } from './utils/index.js';

const getDefaultLottoListTemplate = (count) => '<p class="lotto">🎟️</p>'.repeat(count);

const getDetailLottoListTemplate = (lottos) => {
  return lottos
    .map((lotto) => `<p class="lotto">🎟️<span class="lotto-number">${lotto.join(', ')}</span></p>`)
    .join('');
};

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
};

export default view;
