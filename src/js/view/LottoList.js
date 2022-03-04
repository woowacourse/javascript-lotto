import { ID, CLASS } from '../constants/attribute.js';
import { $, replaceHTML } from '../utils/dom.js';

export default class LottoListView {
  constructor() {
    this.#configureDOM();
    this.#bindToggleClick();
  }

  #configureDOM() {
    this.$lottoListSection = $(ID.LOTTO_LIST_SECTION);
    this.$lottoLists = $(ID.LOTTO_LISTS);
    this.$lottoListDescriptionQuantity = $(ID.LOTTO_LIST_DESCRIPTION_QUANTITY);
    this.$toggle = $(ID.TOGGLE);
    this.$toggleInput = $(ID.TOGGLE_INPUT);
  }

  #bindToggleClick() {
    this.$toggle.addEventListener('click', () => {
      const isChecked = this.$toggleInput.checked;
      this.$toggleInput.checked = !isChecked;
      this.$lottoLists.classList.toggle(CLASS.UNFOLD);
    });
  }

  showLottoListSection(lottoList) {
    this.displayLottoListSection();
    this.$lottoListDescriptionQuantity.textContent = lottoList.length;

    this.#showLottoList(lottoList);
  }

  displayLottoListSection() {
    this.$lottoListSection.classList.add(CLASS.LOTTO_LIST_SECTION_DISPLAY);
  }

  displayNoneLottoListSection() {
    this.$lottoListSection.classList.remove(CLASS.LOTTO_LIST_SECTION_DISPLAY);
  }

  #showLottoList(lottoList) {
    replaceHTML(this.$lottoLists, lottoListTemplate(lottoList));
  }
}

function lottoListTemplate(lottoList) {
  return lottoList
    .map(
      lotto => `
      <li class="${CLASS.LOTTO_LIST}">
        <span class="${CLASS.LOTTO_LIST_TICKET}">🎟️</span>
        <span class="${CLASS.LOTTO_LIST_NUMBERS}">${[...lotto.values()].join(', ')}</span>
      </li>`,
    )
    .join('');
}
