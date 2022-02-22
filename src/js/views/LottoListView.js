import { $ } from '../utils/element-manager.js';

export default class LottoListView {
  #container;
  #lottoNumberToggle;
  constructor($element) {
    this.#container = $element;
    this.#lottoNumberToggle = $($element, '#lotto-number-toggle');
  }

  bindLottoNumberToggle() {
    this.#lottoNumberToggle.addEventListener('click', this.toggleShow.bind(this));
  }

  toggleShow() {
    const toggleDataset = this.#lottoNumberToggle.dataset;
    if (toggleDataset.state === 'on') {
      toggleDataset.state = 'off';
    } else if (toggleDataset.state === 'off') {
      toggleDataset.state = 'on';
    }

    $(this.#container, '.lotto-item-container').classList.toggle('show');
  }

  renderLottoList(lottos) {
    $(this.#container, '.lotto-item-container').innerHTML = lottos
      .map((numbers) => this.makeLottoTemplate(numbers))
      .join('');

    $(
      this.#container,
      '#lotto-bought-count'
    ).textContent = `총 ${lottos.length}개를 구매하였습니다.`;
  }

  makeLottoTemplate(numbers) {
    return `
    <div class="item"><span>🎟️</span> <span class="numbers">${numbers}</span></div>
    `;
  }
}
