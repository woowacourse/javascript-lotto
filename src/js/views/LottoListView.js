import { $ } from '../utils/element-manager';
import { SELECTOR } from '../constants/selector';
import { makeLottosCountTemplate, makeLottoTemplate } from '../utils/Lotto/template-manager';

export default class LottoListView {
  #container;
  #lottoNumberToggle;
  #toggle;

  constructor($element) {
    this.#container = $element;
    this.#lottoNumberToggle = $($element, `#${SELECTOR.ID.NUMBER_TOGGLE}`);
    this.#toggle = 'close';
  }

  bindLottoNumberToggle() {
    this.#lottoNumberToggle.addEventListener('click', this.toggleShow.bind(this));
  }

  showLottoList() {
    this.#container.classList.add('show');
  }

  toggleShow() {
    this.#toggle = this.#toggle === 'close' ? 'open' : 'close';
    this.toggleButton();
    this.toggleLottoList();
  }

  toggleButton() {
    this.#lottoNumberToggle.dataset.state = this.#toggle;
  }

  toggleLottoList() {
    $(this.#container, `.${SELECTOR.CLASS.LOTTO_ITEM_CONTAINER}`).dataset.state = this.#toggle;
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
