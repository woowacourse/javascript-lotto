import { $, replaceHTML } from '../utils/dom.js';
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

  showLottoList(lottoList) {
    const template = lottoList
      .map(
        lotto => `
        <li class="lotto-list">
          <span class="lotto-list__ticket"></span>
          <span class="lotto-list__numbers">${[...lotto.values()].join(', ')}</span>
        </li>`,
      )
      .join('');
    replaceHTML(this.$lottoLists, template);
  }
}
