import { $ } from '../utils/index.js';

const getDefaultLottoListTemplate = (lottoCount) => {
  return '<p class="lotto">🎟️</p>'.repeat(lottoCount);
};

const getDetailLottoListTemplate = (lottos) => {
  return lottos
    .map((lotto) => `<p class="lotto">🎟️<span class="lotto-number">${lotto.join(', ')}</span></p>`)
    .join('');
};

class LottoListView {
  #lottoCount;

  #lottosDefault;

  #lottosDetail;

  constructor() {
    this.#lottoCount = $('#lotto-count');
    this.#lottosDefault = $('#lottos-container .lottos.default');
    this.#lottosDetail = $('#lottos-container .lottos.detail');
  }

  renderLottoList(lottos) {
    const lottoCount = lottos.length;

    this.#lottoCount.innerText = lottoCount;
    this.#lottosDefault.innerHTML = getDefaultLottoListTemplate(lottoCount);
    this.#lottosDetail.innerHTML = getDetailLottoListTemplate(lottos);
  }

  reset() {
    this.#lottosDefault.innerHTML = '';
    this.#lottosDetail.innerHTML = '';
  }
}

export default LottoListView;
