import { $ } from './utils/index.js';
import template from './template/index.js';

const view = {
  renderLottoList(lottos) {
    this.renderDefaultLottoArea(lottos.length);
    this.renderDetailLottoArea(lottos);
    $('#lotto-count').innerText = lottos.length;
  },

  renderDefaultLottoArea(count) {
    $('#lottos-container .lottos.default').innerHTML = template.defaultLottoList(count);
  },

  renderDetailLottoArea(lottos) {
    $('#lottos-container .lottos.detail').innerHTML = template.detailLottoList(lottos);
  },

  renderFare(fare) {
    $('#fare-input').value = fare;
  },
};

export default view;
