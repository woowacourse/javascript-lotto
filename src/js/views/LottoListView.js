import { $ } from '../utils/element-manager';
import { SELECTOR } from '../constants/selector';
import { makeLottosCountTemplate, makeLottoTemplate } from '../utils/Lotto/template-manager';

export default class LottoListView {
  #container;
  #lottoNumberToggle;
  #lottoItemContainer;

  constructor($element) {
    this.#container = $element;

    this.#lottoNumberToggle = $($element, `#${SELECTOR.ID.NUMBER_TOGGLE}`);
    this.#lottoItemContainer = $($element, `.${SELECTOR.CLASS.LOTTO_ITEM_CONTAINER}`);
  }

  bindLottoNumberToggle() {
    this.#lottoNumberToggle.addEventListener('click', this.toggleShow.bind(this));
  }

  showLottoList() {
    this.#container.classList.add('show');
  }

  hideLottoList() {
    this.#container.classList.remove('show');
  }

  toggleShow() {
    this.#lottoNumberToggle.classList.toggle('on');
    this.#lottoItemContainer.classList.toggle('list');
  }

  renderLottoList(lottos) {
    this.#lottoItemContainer.innerHTML = lottos
      .map((numbers) => makeLottoTemplate(numbers))
      .join('');

    $(this.#container, `#${SELECTOR.ID.LOTTO_BOUGHT_COUNT}`).textContent = makeLottosCountTemplate(
      lottos.length
    );
  }
}
