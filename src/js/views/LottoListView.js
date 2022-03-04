import { $ } from '../utils/element-manager';
import { SELECTOR } from '../constants/selector';
import {
  lottoListSectionTemplate,
  makeLottosCountTemplate,
  makeLottoTemplate,
} from '../utils/Lotto/template-manager';

export default class LottoListView {
  #lottoListSection;

  constructor(element) {
    this.#lottoListSection = element;
    this.#lottoListSection.addEventListener('click', this.toggleButtonHandler.bind(this));
  }

  toggleButtonHandler(event) {
    if (event.target.id === SELECTOR.ID.NUMBER_TOGGLE) {
      this.toggleButton();
      this.toggleLottoList();
    }
  }

  renderLottoListSection() {
    this.#lottoListSection.innerHTML = lottoListSectionTemplate;
  }

  toggleButton() {
    $(this.#lottoListSection, `#${SELECTOR.ID.NUMBER_TOGGLE}`).classList.toggle('open');
  }

  toggleLottoList() {
    $(this.#lottoListSection, `.${SELECTOR.CLASS.LOTTO_ITEM_CONTAINER}`).classList.toggle('open');
  }

  renderLottoListItems(lottos) {
    $(this.#lottoListSection, `.${SELECTOR.CLASS.LOTTO_ITEM_CONTAINER}`).innerHTML = lottos
      .map((numbers) => makeLottoTemplate(numbers))
      .join('');

    $(this.#lottoListSection, `#${SELECTOR.ID.LOTTO_BOUGHT_COUNT}`).textContent =
      makeLottosCountTemplate(lottos.length);
  }

  reset() {
    this.#lottoListSection.replaceChildren();
  }
}
