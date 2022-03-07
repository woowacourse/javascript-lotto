import { $, replaceHTML } from '../utils/dom';
import { ID_SELECTOR, CLASS_NAME } from '../constants';
import View from '../core/View';

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

  renderLottoListSection(lottos) {
    this.show();
    this.#showDescription(lottos.length);
    replaceHTML(this.$lottoLists, this.templateLottoList(lottos));
  }

  #showDescription(quantity) {
    this.$lottoListDescription.textContent = `총 ${quantity}개를 구매하였습니다.`;
  }

  templateLottoList(lottos) {
    return lottos
      .map(
        lotto => `
        <li class="${CLASS_NAME.LOTTO_LIST}">
          <span class="${CLASS_NAME.LOTTO_LIST_TICKET}">🎟️</span>
          <span class="${CLASS_NAME.LOTTO_LIST_NUMBERS}">${lotto.join(', ')}</span>
        </li>`,
      )
      .join('');
  }
}
