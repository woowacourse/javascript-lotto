import { $ } from '../utils/dom.js';
import { ID_SELECTOR } from '../constants.js';

export default class LottoListView {
  constructor() {
    this.configureDOM();
  }

  configureDOM() {
    this.$lottoLists = $(ID_SELECTOR.LOTTO_LISTS);
    this.$lottoListDescription = $(ID_SELECTOR.LOTTO_LIST_DESCRIPTION);
  }

  showDescription(quantity) {
    this.$lottoListDescription.textContent = `총 ${quantity}개를 구매하였습니다.`;
  }
  // textContent -> innerText -> insertAdjacent
}
