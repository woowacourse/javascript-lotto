import { $, replaceHTML } from '../utils/dom.js';
import { ID_SELECTOR, CLASS_NAME } from '../constants.js';

export default class LottoListView {
  constructor() {
    this.#configureDOM();
    this.#onClickToggle();
  }

  #configureDOM() {
    this.$lottoListSection = $(ID_SELECTOR.LOTTO_LIST_SECTION);
    this.$lottoLists = $(ID_SELECTOR.LOTTO_LISTS);
    this.$lottoListDescription = $(ID_SELECTOR.LOTTO_LIST_DESCRIPTION);
    this.$toggle = $(ID_SELECTOR.TOGGLE);
    this.$toggleInput = $(ID_SELECTOR.TOGGLE_INPUT);
  }

  #onClickToggle() {
    this.$toggle.addEventListener('click', () => {
      const isChecked = this.$toggleInput.checked;
      this.$toggleInput.checked = !isChecked;
      this.$lottoLists.classList.toggle(CLASS_NAME.UNFOLD);
    });
  }

  showLottoListSection(lottoList) {
    this.#displayLottoListSection();
    this.#showDescription(lottoList.length);
    this.#showLottoList(lottoList);
  }

  #displayLottoListSection() {
    this.$lottoListSection.classList.remove(CLASS_NAME.LOTTO_LIST_SECTION_DISPLAY_NONE);
  }

  #showDescription(quantity) {
    this.$lottoListDescription.textContent = `총 ${quantity}개를 구매하였습니다.`;
  }

  #showLottoList(lottoList) {
    const template = lottoList
      .map(
        lotto => `
        <li class="${CLASS_NAME.LOTTO_LIST}">
          <span class="${CLASS_NAME.LOTTO_LIST_TICKET}">🎟️</span>
          <span class="${CLASS_NAME.LOTTO_LIST_NUMBERS}">${[...lotto.values()].join(
          ', ',
        )}</span>
        </li>`,
      )
      .join('');
    replaceHTML(this.$lottoLists, template);
  }
}
