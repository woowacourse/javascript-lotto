import { ClassName, QuerySelector, Tag } from '../constants/HTML';
import { $, makeNode } from '../utils/DomUtils';
import Convertor from '../utils/Convertor';

class LottoList {
  constructor() {
    this.lottoListField = $(QuerySelector.LOTTO_LIST_FIELD);
  }

  #createPurchaseMessageEl = (purchaseCount) => {
    const purchaseMessageEl = makeNode(Tag.DIV);
    purchaseMessageEl.className = QuerySelector.PURCHASE_MESSAGE;
    purchaseMessageEl.innerText = Convertor.purchaseCount(purchaseCount);

    return purchaseMessageEl;
  };

  #createLottoListEl = (lottos) => {
    const lottoListEl = makeNode(Tag.UL);
    lottoListEl.className = QuerySelector.LOTTO_LIST;
    lottos.forEach((lotto) => {
      const lottoEl = makeNode(Tag.LI);
      lottoEl.className = QuerySelector.LOTTO;
      lottoEl.innerText = Convertor.lottoWithIcon(lotto);
      lottoListEl.appendChild(lottoEl);
    });

    return lottoListEl;
  };

  render = (purchaseCount, lottos) => {
    const purchaseMessageEl = this.#createPurchaseMessageEl(purchaseCount);
    const lottoListEl = this.#createLottoListEl(lottos);

    this.lottoListField.innerText = '';

    this.lottoListField.appendChild(purchaseMessageEl);
    this.lottoListField.appendChild(lottoListEl);

    $(QuerySelector.CONTENT).classList.add(ClassName.HEIGHT_AUTO);
  };
}

export default LottoList;
