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

  #lottosContainer;

  #lottosDefault;

  #lottosDetail;

  #lottoViewerController;

  constructor() {
    this.#lottoCount = $('#lotto-count');
    this.#lottosContainer = $('#lottos-container');
    this.#lottosDefault = $('#lottos-container .lottos.default');
    this.#lottosDetail = $('#lottos-container .lottos.detail');
    this.#lottoViewerController = $('#lotto-viewer-controller');
  }

  renderLottoList(lottos) {
    const lottoCount = lottos.length;

    this.#lottoCount.innerText = lottoCount;
    this.#lottosDefault.innerHTML = getDefaultLottoListTemplate(lottoCount);
    this.#lottosDetail.innerHTML = getDetailLottoListTemplate(lottos);
  }

  reset() {
    this.#lottosContainer.classList.remove('detail');
    this.#lottoViewerController.checked = false;
    this.#lottoCount.innerText = 0;
    this.#lottosDefault.innerHTML = '';
    this.#lottosDetail.innerHTML = '';
  }
}

export default LottoListView;
