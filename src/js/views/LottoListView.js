import { $ } from '../utils/element-manager';
import { SELECTOR } from '../constants/selector';
import { makeLottosCountTemplate, makeLottoTemplate } from '../utils/Lotto/template-manager';

export default class LottoListView {
  #container;
  #lottoNumberToggle;

  constructor($element) {
    this.#container = $element;
    this.#lottoNumberToggle = $($element, `#${SELECTOR.ID.NUMBER_TOGGLE}`);
  }

  bindLottoNumberToggle() {
    this.#lottoNumberToggle.addEventListener('click', this.toggleShowLottoList.bind(this));
  }

  showLottoList() {
    this.#container.classList.add('show');
  }

  toggleShowLottoList() {
    const toggle = this.#lottoNumberToggle.dataset.state === 'open' ? 'close' : 'open';
    this.#lottoNumberToggle.dataset.state = toggle;
    $(this.#container, `.${SELECTOR.CLASS.LOTTO_ITEM_CONTAINER}`).dataset.state = toggle;
  }

  renderLottoList(lottos) {
    $(this.#container, `.${SELECTOR.CLASS.LOTTO_ITEM_CONTAINER}`).innerHTML = lottos
      .map((numbers) => makeLottoTemplate(numbers))
      .join('');

    $(this.#container, `#${SELECTOR.ID.LOTTO_BOUGHT_COUNT}`).textContent = makeLottosCountTemplate(
      lottos.length
    );
  }
}
