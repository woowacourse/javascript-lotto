import { QuerySelector } from '../constants/Dom';
import { $, makeNode } from '../utils/DomUtils';
import Convertor from '../utils/Convertor';

class LottoList {
  constructor() {
    this.lottoListField = $(QuerySelector.LOTTO_LIST_FIELD);
  }

  #createPurchaseMessageEl(purchaseCount) {
    const purchaseMessageEl = makeNode('div');
    purchaseMessageEl.className = QuerySelector.PURCHASE_MESSAGE;
    purchaseMessageEl.innerText = Convertor.purchaseCount(purchaseCount);

    return purchaseMessageEl;
  }

  #createLottoListEl(lottos) {
    const lottoListEl = makeNode('ul');
    lottoListEl.className = QuerySelector.LOTTO_LIST;
    lottos.forEach((lotto) => {
      const lottoEl = makeNode('li');
      lottoEl.className = QuerySelector.LOTTO;
      lottoEl.innerText = Convertor.lottoWithIcon(lotto);
      lottoListEl.append(lottoEl);
    });

    return lottoListEl;
  }

  render(purchaseCount, lottos) {
    this.reset();

    const purchaseMessageEl = this.#createPurchaseMessageEl(purchaseCount);
    const lottoListEl = this.#createLottoListEl(lottos);

    this.lottoListField.append(purchaseMessageEl);
    this.lottoListField.append(lottoListEl);
  }

  reset() {
    this.lottoListField.innerText = '';
  }
}

export default new LottoList();
