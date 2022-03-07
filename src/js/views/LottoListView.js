import { SELECTOR } from '../constants/selector';
import { $ } from '../utils/element-manager';
import { makeLottosCountTemplate, makeLottoTemplate } from '../utils/Lotto/template-manager';

export default class LottoListView {
  #container;
  #lottoNumberToggle;
  #lottoItemContainer;

  constructor() {
    this.#container = $(SELECTOR.CLASS.LOTTO_LIST_SECTION);

    this.#lottoNumberToggle = $(this.#container, SELECTOR.ID.NUMBER_TOGGLE);
    this.#lottoItemContainer = $(this.#container, SELECTOR.CLASS.LOTTO_ITEM_CONTAINER);
    this.init();
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

    $(this.#container, SELECTOR.ID.LOTTO_BOUGHT_COUNT).textContent = makeLottosCountTemplate(
      lottos.length
    );
  }
}
