import { $, replaceHTML } from '../utils/dom.js';
import { ID_SELECTOR, CLASS_NAME } from '../constants.js';
import View from '../core/View.js';

export default class LottoListView extends View {
  _configureDOM() {
    this.$lottoLists = $(ID_SELECTOR.LOTTO_LISTS, this.container);
    this.$lottoListDescription = $(ID_SELECTOR.LOTTO_LIST_DESCRIPTION, this.container);
    this.$toggle = $(ID_SELECTOR.TOGGLE, this.container);
    this.$toggleInput = $(ID_SELECTOR.TOGGLE_INPUT, this.container);
  }

  _bindEvents() {
    this.$toggle.addEventListener('click', () => {
      const isChecked = this.$toggleInput.checked;
      this.$toggleInput.checked = !isChecked;
      this.$lottoLists.classList.toggle(CLASS_NAME.UNFOLD);
    });
  }

  renderLottoListSection(lottoList) {
    this.show();
    this.#showDescription(lottoList.length);
    this.#showLottoList(lottoList);
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
          <span class="${CLASS_NAME.LOTTO_LIST_NUMBERS}">${[...lotto.values()].join(', ')}</span>
        </li>`,
      )
      .join('');
    replaceHTML(this.$lottoLists, template);
  }
}
