import {
  LOTTO_ITEM_TEMPLATE,
  LOTTO_LIST_TITLE_TEMPLATE,
  LOTTO_TICKETS_WRAPPER_TEMPLATE,
} from '../../constants/LottoListConstants.js';

class LottoList {
  constructor(container) {
    this.container = container;
  }

  render(lottos) {
    this.container.innerHTML = this.template(lottos);
  }

  template(lottos) {
    const titleHTML = LOTTO_LIST_TITLE_TEMPLATE(lottos.length);
    const lottoItemsHTML = lottos
      .map((lotto) => LOTTO_ITEM_TEMPLATE(lotto.numbers))
      .join('');
    return `${titleHTML}
      ${LOTTO_TICKETS_WRAPPER_TEMPLATE(lottoItemsHTML)}
    `;
  }
}

export default LottoList;
