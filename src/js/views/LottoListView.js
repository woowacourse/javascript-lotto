import { $ } from '../utils/element-manager';
import { SELECTOR } from '../constants/selector';
import { makeLottosCountTemplate, makeLottoTemplate } from '../utils/Lotto/template-manager';

export default class LottoListView {
  #container;
  #lottoNumberToggle;
  #lottoItemContainer;

  constructor(containerSelector) {
    this.#container = $(containerSelector);

    this.#lottoNumberToggle = $(this.#container, SELECTOR.NUMBER_TOGGLE);
    this.#lottoItemContainer = $(this.#container, SELECTOR.LOTTO_ITEM_CONTAINER);
  }

  init() {
    this.#lottoItemContainer.innerHTML = '';
    this.hideContainer();
  }

  bindLottoNumberToggle() {
    this.#lottoNumberToggle.addEventListener('click', this.toggleShow.bind(this));
  }

  showContainer() {
    this.#container.classList.add('show');
  }

  hideContainer() {
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

    $(this.#container, SELECTOR.LOTTO_BOUGHT_COUNT).textContent = makeLottosCountTemplate(
      lottos.length
    );
  }
}
