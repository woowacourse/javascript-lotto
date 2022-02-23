import { $ } from '../utils/element-manager.js';
import { SELECTOR } from '../constants/selector.js';

export default class LottoListView {
  #container;
  #lottoNumberToggle;
  constructor($element) {
    this.#container = $element;
    this.#lottoNumberToggle = $($element, `#${SELECTOR.ID.NUMBER_TOGGLE}`);
  }

  bindLottoNumberToggle() {
    this.#lottoNumberToggle.addEventListener('click', this.toggleShow.bind(this));
  }

  toggleShow() {
    const toggleDataset = this.#lottoNumberToggle.dataset;
    toggleDataset.state = toggleDataset.state === 'on' ? 'off' : 'on';
    $(this.#container, `.${SELECTOR.CLASS.LOTTO_ITEM_CONTAINER}`).classList.toggle('show');
  }

  renderLottoList(lottos) {
    $(this.#container, `.${SELECTOR.CLASS.LOTTO_ITEM_CONTAINER}`).innerHTML = lottos
      .map((numbers) => this.makeLottoTemplate(numbers))
      .join('');

    $(
      this.#container,
      `#${SELECTOR.ID.LOTTO_BOUGHT_COUNT}`
    ).textContent = `총 ${lottos.length}개를 구매하였습니다.`;
  }

  makeLottoTemplate(numbers) {
    return `
    <div class="${SELECTOR.CLASS.LOTTO_ITEM}"><span>🎟️</span> <span class="${SELECTOR.CLASS.LOTTO_ITEM_NUMBER}">${numbers}</span></div>
    `;
  }
}
