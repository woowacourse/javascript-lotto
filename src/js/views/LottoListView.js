import { $ } from '../utils/element-manager';
import { SELECTOR } from '../constants/selector';
import { makeLottosCountTemplate, makeLottoTemplate } from '../utils/Lotto/template-manager';

export default class LottoListView {
  #container;

  constructor($element) {
    this.#container = $element;
    $(this.#container, `#${SELECTOR.ID.NUMBER_TOGGLE}`).addEventListener(
      'click',
      this.toggleButtonHandler.bind(this)
    );
  }

  toggleButtonHandler() {
    this.toggleButton();
    this.toggleLottoList();
  }

  showLottoList() {
    this.#container.classList.add('show');
  }

  toggleButton() {
    $(this.#container, `#${SELECTOR.ID.NUMBER_TOGGLE}`).classList.toggle('open');
  }

  toggleLottoList() {
    $(this.#container, `.${SELECTOR.CLASS.LOTTO_ITEM_CONTAINER}`).classList.toggle('open');
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
