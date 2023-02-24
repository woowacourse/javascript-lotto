import { QuerySelector, Tag } from '../constants/Dom';
import { $, makeNode } from '../utils/DomUtils';
import Convertor from '../utils/Convertor';

class LottoList {
  constructor() {
    this.lottoListField = $(QuerySelector.LOTTO_LIST_FIELD);
    this.contentEl = $(QuerySelector.CONTENT);
  }

  #createPurchaseMessageEl(purchaseCount) {
    const purchaseMessageEl = makeNode(Tag.DIV);
    purchaseMessageEl.className = QuerySelector.PURCHASE_MESSAGE;
    purchaseMessageEl.innerText = Convertor.purchaseCount(purchaseCount);

    return purchaseMessageEl;
  }

  #createLottoListEl(lottos) {
    const lottoListEl = makeNode(Tag.UL);
    lottoListEl.className = QuerySelector.LOTTO_LIST;
    lottos.forEach((lotto) => {
      const lottoEl = makeNode(Tag.LI);
      lottoEl.className = QuerySelector.LOTTO;
      lottoEl.innerText = Convertor.lottoWithIcon(lotto);
      lottoListEl.append(lottoEl);
    });

    return lottoListEl;
  }

  render(purchaseCount, lottos) {
    const purchaseMessageEl = this.#createPurchaseMessageEl(purchaseCount);
    const lottoListEl = this.#createLottoListEl(lottos);

    this.reset();

    this.lottoListField.append(purchaseMessageEl);
    this.lottoListField.append(lottoListEl);
  }

  reset() {
    this.lottoListField.innerText = '';
  }
}

export default new LottoList();
